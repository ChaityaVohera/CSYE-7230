const mongoose = require("mongoose");

/**
 * @typedef Chat
 * @property {string} chatName - Optional name of the chat (for group chats).
 * @property {boolean} isGroupChat - Flag indicating if the chat is a group chat.
 * @property {Array.<mongoose.ObjectId>} users - Array of User IDs participating in the chat.
 * @property {mongoose.ObjectId} latestMessage - Reference to the latest message in the chat.
 * @property {mongoose.ObjectId} groupAdmin - User ID of the group admin (only for group chats).
 * @property {Date} createdAt - Timestamp when the chat was created.
 * @property {Date} updatedAt - Timestamp when the chat was last updated.
 */

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
