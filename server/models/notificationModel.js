import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Notification must have a type"],
    enum: ["Friend", "Chat"],
  },

  sender: {
    type: String,
    required: [true, "Notification must have the id of the sender"],
  },

  receiver: {
    type: String,
    required: [true, "Notification must have the id of the receiver"],
  },

  sentDate: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
