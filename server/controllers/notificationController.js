import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";

const getNotifications = async (req, res, next) => {
  try {
    const user = req.user;
    const notifications = await Notification.find({ receiver: user.id });

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

const sendFriendRequest = async (req, res, next) => {
  try {
    const user = req.user;
    const { friend } = req.params;

    console.log(user._id);

    const notification = await Notification.create({
      type: "Friend",
      sender: user._id,
      receiver: friend,
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

const deleteNotification = async (req, res, next) => {};
export default { sendFriendRequest, getNotifications, deleteNotification };
