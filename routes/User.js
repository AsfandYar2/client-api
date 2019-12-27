const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const SECRET = "MY_SECRET_KEY";
//Modal
const User = require("../modals/User");

// @route POST /users
// @decs Register a user
// @access Public
router.post(
  "/",
  [
    check("name", "firstName is required")
      .not()
      .isEmpty(),
    check("email", "Please Include Valid email").isEmail(),
    check(
      "password",
      "Please enter a password with six or more charachter"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    }

    user = new User({ name, email, password });

    salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: { id: user.id }
    };
    let token = await jwt.sign(payload, SECRET, { expiresIn: 360000 });

    await res.send(token);
  }
);

module.exports = router;
