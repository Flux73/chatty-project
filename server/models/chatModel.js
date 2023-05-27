import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Chat must have a message text"],
  },

  sender: {
    type: String,
  },

  receiver: {
    type: String,
  },

  sentDate: {
    type: Date,
    default: Date.now(),
  },

  isSeen: { type: Boolean, default: false },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
