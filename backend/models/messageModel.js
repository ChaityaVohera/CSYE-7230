const mongoose = require("mongoose");

/**
 * @typedef Message
 * @property {mongoose.ObjectId} sender - The user who sent the message.
 * @property {string} content - The text content of the message.
 * @property {mongoose.ObjectId} chat - The chat thread this message belongs to.
 * @property {Array.<mongoose.ObjectId>} readBy - Array of user IDs who have read the message.
 * @property {Date} createdAt - Timestamp when the message was created.
 * @property {Date} updatedAt - Timestamp when the message was last updated.
 */

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
