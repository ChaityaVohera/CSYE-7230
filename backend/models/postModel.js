const mongoose = require("mongoose");

/**
 * @typedef Post
 * @property {mongoose.ObjectId} userId.required - The ID of the user who created the post.
 * @property {string} title.required - The title of the post.
 * @property {string} text.required - The main content of the post.
 * @property {Date} createdAt - The date and time when the post was created.
 * @property {Date} updatedAt - The date and time when the post was last updated.
 */

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
