const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User who posted
      title: { type: String, required: true },  // Title of the post
      text: { type: String, required: true },  // Content/text of the post
      createdAt: { type: Date, default: Date.now },  // Timestamp when the post was created
    },
    { timestamps: true }
  );
  
  const Post = mongoose.model("Post", postSchema);
  
  module.exports = Post;
  