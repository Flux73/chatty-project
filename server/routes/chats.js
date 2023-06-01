import express from "express";
import chatControllers from "../controllers/chatController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router
  .route("/:friend")
  .get(authController.protect, chatControllers.getMessages)
  .post(authController.protect, chatControllers.addMessage);

router.patch(
  "/updateIsSeen/:friend",
  authController.protect,
  chatControllers.updateIsSeenMessages
);

export default router;
