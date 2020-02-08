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
  const { title, body, comment, like } = req.body;
  //Build Post Object
  const postFields = {};
  if (title) postFields.title = title;
  if (body) postFields.body = body;
  if (comment) postFields.comment = comment;
  if (like) postFields.like = like;
  let post = await userPost.findById(req.params.id);

  if (!post) return res.status(404).json({ msg: "Post not found" });

  post = await userPost.findByIdAndUpdate(
    req.params.id,
    {
      $set: postFields
    },
    { new: true }
  );
  res.json(post);
});

router.delete("/:id", auth, async (req, res) => {
  let post = await userPost.findById(req.params.id);

  if (!post) return res.status(404).json({ msg: "Post not found" });
  await userPost.findByIdAndRemove(req.params.id);
  res.json({ msg: "Delete Successfully" });
});
module.exports = router;
