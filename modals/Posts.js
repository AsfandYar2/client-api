const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  title: { type: String },
  body: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("post", PostSchema);
