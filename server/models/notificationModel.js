import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Notification must have a type"],
    // enum: ["Friend", "Chat"],
  },

  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  receiver: {
    type: String,
    required: [true, "Notification must have the id of the receiver"],
  },

  sentDate: {
    type: Date,
  },

  isSeen: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
