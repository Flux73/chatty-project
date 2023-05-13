import express from "express";
import authController from "../controllers/authController.js";
import friendController from "../controllers/friendController.js";

const router = express.Router();

router.get("/", authController.protect, friendController.getFriends);
router
  .get("/:friend", authController.protect, friendController.getFriend)
  .patch("/:friend", authController.protect, friendController.addFriend);

export default router;
