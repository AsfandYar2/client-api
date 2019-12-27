const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const SECRET = "MY_SECRET_KEY";
//Modal
const User = require("../modals/User");

// @route GET /auth
// @desc get logged in
// @access Private
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// @route POST /auth
// @decs Auth user register
// @access Public
router.post(
  "/",
  [
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
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }
    const payload = {
      user: { id: user.id }
    };
    let token = await jwt.sign(payload, SECRET, { expiresIn: 360000 });

    await res.send(token);
  }
);

module.exports = router;
