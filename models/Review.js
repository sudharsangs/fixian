const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: "You must supply an author!"
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: "You must supply a store!"
  },
  text: {
    type: String,
    required: "Your review must have text!"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: "Your review must have a rating!"
  }
});

function autopopulate(next) {
  this.populate("author");
  next();
}

reviewSchema.pre("find", autopopulate);
reviewSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Review", reviewSchema);
