const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const keys = require("./../config/keys");
const { normalizeErrors } = require("./../utils/helpers");

//Load User Model
const User = require("./../models/User");

const { auth, confirmedPasswords } = require("./../middleware/index");
const { sendEmail } = require("./../utils/mail/index");

// @route   GET api/users/register
// @desc    Register User
// @access  Public
router.post("/register", confirmedPasswords, (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      return newUser.save();
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT token
// @access  Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      //Check for User
      if (!user) {
        return res.status(422).json({
          errors: [{ detail: "Incorrect Email or Password" }]
        });
      }
      //Check password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.status(400).json({
            errors: [{ detail: "Incorrect Email or Password" }]
          });

        user.generateToken((err, user) => {
          if (err)
            return res.status(422).json({ errors: normalizeErrors(err) });
          res
            .cookie("w_auth", user.token)
            .status(200)
            .json({
              loginSuccess: true
            });
        });
      });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// ROUTE /api/users/logout
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then(doc => {
      return res.send({
        success: true
      });
    })
    .catch(err => {
      return res.status(422).json({ errors: normalizeErrors(err) });
    });
});

// ROUTE /api/users/update_profile
router.post("/update_profile", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body
    },
    { new: true }
  )
    .then(doc => {
      res.json({ success: true });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// ROUTE /api/users/auth
router.get("/auth", auth, (req, res) => {
  res.json({
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    avatar: req.user.avatar,
    id: req.user._id,
    hearts: req.user.hearts
  });
});

// ROUTE /api/users/forgot_password
// Generate reset token on User model and email it to user
router.post("/forgot_password", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.json({ success: true, email: false });
      }
      user.generateResetToken((err, user) => {
        if (err) return res.status(422).json({ errors: normalizeErrors(err) });
        sendEmail(user.email, user.name, "reset_password", user);
        return res.json({ success: true });
      });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

// ROUTE /api/users/reset_password
router.post("/reset_password", confirmedPasswords, (req, res) => {
  const now = moment().valueOf();

  User.findOne({
    resetToken: req.body.resetToken,
    resetTokenExp: {
      $gte: now
    }
  })
    .then(user => {
      if (!user) {
        res.status(422).json({
          errors: [
            {
              detail: "Password Reset is invalid or has expired"
            }
          ]
        });
        return;
      }
      user.password = req.body.password;
      user.resetToken = "";
      user.resetTokenExp = "";
      user.save().then(() => {
        return res.status(200).json({
          success: true
        });
      });
    })
    .catch(err => res.status(422).json({ errors: normalizeErrors(err) }));
});

module.exports = router;
