import express from "express";
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);
router.get("/logout", authController.protect, authController.logout);
router.post("/forgetPassword", authController.forgetPassword);

router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/changePassword",
  authController.protect,
  authController.changePassword
);

router
  .route("/me")
  .get(authController.protect, userController.me)
  .patch(authController.protect, userController.updateMe);

router.get("/:user", authController.protect, userController.searchUsers);

export default router;
