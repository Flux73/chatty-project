import express from "express";
import notificationController from "../controllers/notificationController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/sendFriendRequest/:friend",
  authController.protect,
  notificationController.sendFriendRequest
);

router.get(
  "/isSendFriendRequest/:friend",
  authController.protect,
  notificationController.getIsSentFriendRequest
);

router.get(
  "/",
  authController.protect,
  notificationController.getNotifications
);

export default router;
