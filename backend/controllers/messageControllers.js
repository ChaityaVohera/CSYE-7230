const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

/**
 * Get all messages for a specific chat.
 * @route GET /api/Message/:chatId
 * @access Protected
 * @param {Object} req - Express request object containing `chatId` as a URL parameter.
 * @param {Object} res - Express response object.
 * @returns {Array} - Array of message documents for the chat.
 */
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/**
 * Send a new message in a chat.
 * @route POST /api/Message/
 * @access Protected
 * @param {Object} req - Express request object containing `content` and `chatId` in the body.
 * @param {Object} res - Express response object.
 * @returns {Object} - The created message document, with populated sender and chat info.
 */
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
