const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const userPost = require("../modals/Posts");

router.post("/", auth, async (req, res) => {
  const { title, body, comment, like } = req.body;
  user = new userPost({ user: req.user.id, title, body, comment, like });
  user = await user.save();
  res.json(user);
});

router.get("/", auth, async (req, res) => {
  const post = await userPost.find({ user: req.user.id });
  res.json(post);
});

router.put("/:id", auth, async (req, res) => {
  const { title, post, comment, like } = req.body;
  //Build Post Object
  const postFields = {};
  if (title) postFields.title = title;
  if (post) postFields.post = post;
  if (comment) postFields.comment = comment;
  if (like) postFields.like = like;

  await userPost.findByIdAndUpdate(
    req.params.id,
    {
      $set: postFields
    },
    { new: true }
  );
  res.json({ msg: "Updated Successfully" });
});

router.delete("/:id", auth, async (req, res) => {
  await userPost.findByIdAndRemove(req.params.id);
  res.json({ msg: "Delete Successfully" });
});
module.exports = router;
