const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
const { SECRET } = require("./../config/keys");

const UserSchema = new Schema({
  name: {
    type: String,
    required: "name is required",
    minlength: [4, "Too short, min is 4 characters"],
    maxlength: [32, "Too long, max name is 32 characters"]
  },
  email: {
    type: String,
    required: "email is required",
    trim: true,
    unique: true,
    lowercase: true,
    minlength: [4, "Too short, min is 4 characters"],
    maxlength: [128, "Too long, max is 128 characters"]
  },
  password: {
    type: String,
    required: "Password is required",
    minlength: [4, "Too short, min is 4 characters"],
    maxlength: [512, "Too long, max pass is 512 characters"]
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Number
  },
  hearts: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "Store" }],
    default: []
  }
});

UserSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    //Prevent rehashing if user changes name/email, etc
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.generateResetToken = function(cb) {
  let user = this;

  crypto.randomBytes(20, function(err, buffer) {
    let token = buffer.toString("hex");
    let expire = moment()
      .add(2, "hours")
      .valueOf();

    user.resetToken = token;
    user.resetTokenExp = expire;
    user.save(function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

UserSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), SECRET);

  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

UserSchema.statics.findByToken = function(token, cb) {
  var user = this;

  jwt.verify(token, SECRET, function(err, decode) {
    user
      .findOne({ _id: decode, token: token })
      .then(user => {
        return cb(null, user);
      })
      .catch(err => cb(err));
  });
};

module.exports = User = mongoose.model("users", UserSchema);
