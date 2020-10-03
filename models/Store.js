const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
const slug = require("slugs"); //Helps make url more friendly

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Please enter a store name", //Will require it and pass this msg.
      minlength: [4, "Too short, store name must be at least 4 characters."]
    },
    slug: String, // Auto generated whenever someone saves
    description: {
      type: String,
      trim: true
    },
    photo: {
      type: String,
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: "You must supply an author"
    },
    tags: [String],
    created: {
      type: Date,
      default: Date.now
    },
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: [
        {
          type: Number,
          required: "You must supply coordinates"
        }
      ],
      address: {
        type: String,
        required: "You must supply an address!"
      }
    }
  },
  {
    toJSON: { virtuals: true }, //virtuals by def do not show up when sent off in a document converted to json
    toObject: { virtuals: true }
  }
);

//Define our indexes for faster lookup
storeSchema.index({
  name: "text",
  description: "text"
});

storeSchema.index({ location: "2dsphere" });

storeSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    //so slug is only changed if name was changed b4 save
    next();
    return;
  }
  this.slug = slug(this.name);
  //See if there are stores with same slug
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
  this.constructor.find({ slug: slugRegEx }).then(storesWithSlug => {
    if (storesWithSlug.length > 0) {
      this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }
    next();
  });
});

storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: "$tags" }, //if a restaurant has three tags, it will return the three copies of the restaurant but each with a different tag.
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } } //sort by count descending
  ]);
};

storeSchema.statics.getTopStores = function() {
  return this.aggregate([
    //cannot use mongoose virtual, since aggregate is for lower level mongodb
    // Lookup Stores and populate their reviews
    {
      $lookup: {
        from: "reviews", //Look up Model Name Review after it has been lowercased and pluralized
        localField: "_id",
        foreignField: "store",
        as: "reviews"
      }
    },
    // filter for only items that have 2 or more reviews
    { $match: { "reviews.1": { $exists: true } } }, //1st index in array exists. This is mongo db code not js
    // Add the average reviews field
    {
      $addFields: {
        averageRating: { $avg: "$reviews.rating" } //$ means pipe it in from our match
      }
    },
    // sort it by our new field, highest reviews first
    { $sort: { averageRating: -1 } },
    { $limit: 10 }
  ]);
};

//Find reviews where stores _id  === reviews store
//We are not creating a relationship between the two. Its all virtual. Think
//of join in SQL
storeSchema.virtual("reviews", {
  ref: "Review", //What model to link?
  localField: "_id", //which field on the store matches with review?
  foreignField: "store" //which field on the review matches with store?
});

function autopopulate(next) {
  this.populate("reviews"); //From Virtual
  next();
}

storeSchema.pre("find", autopopulate); //So whenever i query a store it autopop
storeSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Store", storeSchema);
