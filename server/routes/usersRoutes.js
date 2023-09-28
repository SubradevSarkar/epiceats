import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
import { hasAccess, isAllowed } from "../middleware/authMiddleware.js";

router.get("/login", isAllowed(), userController.loginPage);
router.post("/login", isAllowed(), userController.login);
router.get("/register", isAllowed(), userController.registrationPage);
router.post("/register", isAllowed(), userController.registration);
router.post(
  "/otp-register",
  hasAccess(["user"]),
  userController.otpRegistration
);
router.post("/send-otp", userController.sendOtp);
router.post("/logout", userController.logout);
router.get("/profile", hasAccess(["user"]), userController.profilePage);
router.patch(
  "/profile-update",
  hasAccess(["user"]),
  userController.profileUpdate
);
router.patch("/password-reset", userController.passwordReset);

export default router;
