import Notification from "../models/notificationModel.js";

const getNotifications = async (req, res, next) => {
  try {
    const user = req.user;
    let notifications = await Notification.find({
      receiver: user.id,
    }).populate("sender", "username");

    res.status(200).json({
      status: "success",
      data: {
        notifications,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUnseenNotifications = async (req, res, next) => {
  try {
    await Notification.updateMany({ isSeen: false }, { isSeen: true });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

const sendFriendRequest = async (req, res, next) => {
  try {
    const user = req.user;
    const { friend } = req.params;

    console.log(user._id);

    const notification = await Notification.create({
      type: req?.body?.type || "Friend",
      sender: user._id,
      receiver: friend,
      sentDate: Date.now(),
    });

    res.status(200).json({
      status: "success",
      message: "Friend Request has been sent",
      data: {
        notification,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getIsSentFriendRequest = async (req, res, next) => {
  try {
    const user = req.user;
    const { friend } = req.params;

    const notification = await Notification.findOne({
      $and: [
        { $or: [{ sender: user._id }, { sender: friend }] },

        { $or: [{ receiver: user._id }, { receiver: friend }] },
      ],
    });

    let isUserSent;
    if (notification) isUserSent = notification.receiver === friend;

    res.status(200).json({
      status: "success",
      data: isUserSent,
    });
  } catch (err) {
    next(err);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    await Notification.findByIdAndDelete(req.params.notification);

    res.status(204).json({
      status: "success",
      msg: "Notification has been deleted",
    });
  } catch (err) {
    next(err);
  }
};
export default {
  sendFriendRequest,
  getNotifications,
  deleteNotification,
  getIsSentFriendRequest,
  updateUnseenNotifications,
};
