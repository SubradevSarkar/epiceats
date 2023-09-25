import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
import { hasAccess, isAllowed } from "../middleware/authMiddleware.js";

// router.get("/", (req, res) => {});
router.get("/login", isAllowed(), userController.loginPage);
router.post("/login", isAllowed(), userController.login);
router.get("/register", isAllowed(), userController.registrationPage);
router.post("/register", isAllowed(), userController.registration);
router.post(
  "/otp-register",
  hasAccess(["user"]),
  userController.otpRegistration
);
router.post("/otp-resend", userController.resendOtp);
router.post("/logout", userController.logout);
router.get("/profile", hasAccess(["user"]), userController.profilePage);
router.post(
  "/password-reset",
  hasAccess(["user"]),
  userController.passwordReset
);

export default router;
