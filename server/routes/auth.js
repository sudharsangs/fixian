const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { signout, signup, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "Name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email is invalid").isEmail(),
    check("password", "Password should be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
