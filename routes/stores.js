const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const keys = require("../config/keys");
const {
  normalizeErrors,
  confirmOwner,
  checkFileType
} = require("./../utils/helpers");
const { auth, jsonParseBody } = require("./../middleware/index");

const Store = require("./../models/Store");
const Review = require("./../models/Review");

const uploadService = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10000000 }, //file size limit of 10mb
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("file");

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});

// @route   GET api/stores/
// @desc    Get all stores
// @access  Public
router.get("/", (req, res) => {
  // return Store.find()
  //   .then(stores => {
  //     res.json(stores);
  //   })
  //   .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
  const page = req.params.page || 1;
  const limit = 12;
  const skip = page * limit - limit;

  const storesPromise = Store.find() //Find stores for the current page
    .skip(skip)
    .limit(limit)
    .sort({ created: "desc" });

  const countPromise = Store.countDocuments(); //Find total number of stores in db

  Promise.all([storesPromise, countPromise]).then(values => {
    const [stores, count] = values;
    const pages = Math.ceil(count / limit);
    if (!stores.length && skip) {
      return res
        .status(422)
        .json({ errors: [{ detail: "This page does not exist" }] });
    }
    // res.json({ stores, page, pages, count: count });
    res.json({ stores, page, pages, count });
  });
});

// @route   GET api/stores/page/:page
router.get("/page/:page", (req, res) => {
  const page = req.params.page || 1;
  const limit = 12;
  const skip = page * limit - limit;

  const storesPromise = Store.find() //Find stores for the current page
    .skip(skip)
    .limit(limit)
    .sort({ created: "desc" });

  const countPromise = Store.countDocuments(); //Find total number of stores in db

  Promise.all([storesPromise, countPromise]).then(values => {
    const [stores, count] = values;
    const pages = Math.ceil(count / limit);
    if (!stores.length && skip) {
      return res
        .status(422)
        .json({ errors: [{ detail: "This page does not exist" }] });
    }
    // res.json({ stores, page, pages, count: count });
    res.json({ stores, page, pages, count });
  });
});

// @route   POST api/stores/add
// @desc    Add store
// @access  Private
router.post("/add", auth, uploadService, jsonParseBody, (req, res) => {
  req.body.author = req.user._id;
  const newStore = new Store(req.body);
  if (req.file) {
    const key = `${req.user.id}/${uuid()}`;
    newStore.photo = key;
    const { mimetype } = req.file;
    newStore
      .save()
      .then(store => {
        s3.putObject(
          {
            Body: req.file.buffer,
            Bucket: "blogbucket-dev-kevinrsd",
            ContentType: `${mimetype}`,
            Key: key
          },
          (err, data) => {
            res.json(store);
          }
        );
      })
      .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
  } else {
    newStore
      .save()
      .then(store => {
        res.json(store);
      })
      .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
  }
});

// @route   POST api/stores/id/:id/edit
// @desc    Edit store
// @access  Private
router.post("/id/:id/edit", auth, uploadService, jsonParseBody, (req, res) => {
  Store.findOne({ _id: req.params.id })
    .then(store => {
      if (!confirmOwner(store, req.user)) {
        return res.status(400).json({
          errors: [{ detail: "You must have created this store to edit it!" }]
        });
      }
      let updates = req.body;
      if (req.file) {
        const key = `${req.user.id}/${uuid()}`;
        const oldImageUrl = store.photo;
        updates.photo = key;
        //Delete old image
        s3.deleteObject(
          {
            Bucket: "blogbucket-dev-kevinrsd",
            Key: oldImageUrl
          },
          (err, data) => {}
        );
        //Upload new image from user
        s3.putObject(
          {
            Body: req.file.buffer,
            Bucket: "blogbucket-dev-kevinrsd",
            ContentType: req.file.mimetype,
            Key: key
          },
          (err, data) => {}
        );
      }
      return Store.findOneAndUpdate({ _id: req.params.id }, updates, {
        new: true,
        runValidators: true
      })
        .exec()
        .then(store => {
          res.json(store);
        });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/:id/
// @desc    Get a store by id
// @access  Public
router.get("/id/:id", (req, res) => {
  Store.findOne({ _id: req.params.id })
    .populate("author", "_id name email")
    .exec()
    .then(store => {
      res.json(store);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/slug/:slug
// @desc    Get a store by slug
// @access  Public
router.get("/slug/:slug", (req, res) => {
  Store.findOne({ slug: req.params.slug })
    .populate("author", "_id name email")
    .populate("reviews")
    .exec()
    .then(store => {
      res.json(store);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/tags
// @desc    Get a count of all stores with tags
// @access  Public
router.get("/tags", (req, res) => {
  Store.getTagsList()
    .then(tags => {
      res.json(tags);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/tags/:tag
// @desc    Get the stores with a specific tag
// @access  Public
router.get("/tags/:tag", (req, res) => {
  Store.find({ tags: req.params.tag })
    .then(stores => {
      res.json({ stores });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/search?q=cofee
// @desc    Get the stores with search term in name OR description
// @access  Public
router.get("/search", (req, res) => {
  Store.find(
    {
      $text: {
        $search: req.query.q
      }
    },
    {
      //Here we are adding a new field called score
      //Docs with more instances of coffee get higher score
      score: { $meta: "textScore" }
    }
  )
    .sort({
      score: { $meta: "textScore" }
    })
    .limit(100)
    .exec()
    .then(stores => {
      res.json({ stores });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   POST api/stores/:id/heart
// @desc    Heart or Unheart a store
// @access  Private
router.post("/:id/heart", auth, (req, res) => {
  const hearts = req.user.hearts.map(obj => {
    return obj.toString();
  });
  const operator = hearts.includes(req.params.id) ? "$pull" : "$addToSet";
  User.findByIdAndUpdate(
    req.user._id,
    { [operator]: { hearts: req.params.id } }, //use [] for js vars in mongo query
    { new: true } //return updated user
  )
    .then(user => {
      res.json({ success: true });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   POST api/stores/hearts
// @desc    Return stores that User has hearted
// @access  Private
router.get("/hearts", auth, (req, res) => {
  Store.find({
    _id: { $in: req.user.hearts }
  })
    .then(stores => {
      res.json({ stores });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   POST api/stores/add_review/id
// @desc    Add review to a store
router.post("/add_review/:id", auth, (req, res) => {
  req.body.author = req.user._id;
  req.body.store = req.params.id;
  const newReview = new Review(req.body);
  newReview
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/stores/top
// @desc    Add review to a store
router.get("/top", (req, res) => {
  Store.getTopStores()
    .then(stores => {
      res.json({ stores });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

module.exports = router;
