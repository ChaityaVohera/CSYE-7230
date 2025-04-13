
/**
 * @typedef Post
 * @property {mongoose.ObjectId} userId.required - The ID of the user who created the post.
 * @property {string} title.required - The title of the post.
 * @property {string} text.required - The main content of the post.
 * @property {Date} createdAt - The date and time when the post was created.
 * @property {Date} updatedAt - The date and time when the post was last updated.
 */

const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User who posted
      title: { type: String, required: true },  // Title of the post
      text: { type: String, required: true },  // Content/text of the post
      domain : {type: String, required : false},
      createdAt: { type: Date, default: Date.now },  // Timestamp when the post was created
    },
    { timestamps: true }
  );
  
  const Post = mongoose.model("Post", postSchema);
  
  module.exports = Post;
