import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

export const addMessage = async (req, res, next) => {
  try {
    const user = req.user;
    const { friend } = req.params;

    const message = await Chat.create({
      message: req.body.message,
      sender: user._id,
      receiver: friend,
      sentDate: Date.now(),
    });

    res.status(201).json({
      status: "success",
      data: message,
    });
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const user = req.user;
    const { friend } = req.params;

    const chat = await Chat.find({
      $and: [
        { $or: [{ sender: user._id }, { sender: friend }] },

        { $or: [{ receiver: user._id }, { receiver: friend }] },
      ],
    });

    console.log("Death", user);
    res.status(200).json({
      status: "success",
      data: chat,
    });
  } catch (err) {
    next(err);
  }
};

export const updateIsSeenMessages = async (req, res, next) => {
  try {
    const user = req.user;
    const { friend } = req.params;
    const chat = await Chat.updateMany(
      {
        $and: [{ receiver: user._id, sender: friend, isSeen: false }],
      },
      { isSeen: true },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: chat,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  addMessage,
  getMessages,
  updateIsSeenMessages,
};
