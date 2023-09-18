import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
import { authUser, hasAccess } from "../middleware/authMiddleware.js";

// router.get("/", (req, res) => {});
router.get("/login", userController.loginPage);
router.post("/login", userController.login);
router.get("/register", userController.registrationPage);
router.post("/register", userController.registration);
router.post(
  "/otp-register",
  authUser,
  hasAccess(["user"]),
  userController.otpRegistration
);
router.post("/otp-resend", authUser, userController.resendOtp);
router.post("/logout", authUser, hasAccess(["user"]), userController.logout);

export default router;
