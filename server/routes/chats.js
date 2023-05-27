import express from "express";
import chatControllers from "../controllers/chatControllers.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.get(
  "/getUnseenMessages",
  authController.protect,
  chatControllers.getUnseenMessages
);

router
  .route("/:friend")
  .get(authController.protect, chatControllers.getMessages)
  .post(authController.protect, chatControllers.addMessage);

router.patch(
  "/updateIsSeen/:friend",
  authController.protect,
  chatControllers.updateIsSeenMessages
);

router.delete("/:id", authController.protect, chatControllers.deleteMessage);

export default router;
