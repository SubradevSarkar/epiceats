import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
import {
  authUser,
  hasAccess,
  isAllowed,
} from "../middleware/authMiddleware.js";

router.get("/login", authUser, isAllowed(), userController.loginPage);
router.post("/login", authUser, isAllowed(), userController.login);
router.get("/register", authUser, isAllowed(), userController.registrationPage);
router.post("/register", authUser, isAllowed(), userController.registration);
router.post(
  "/otp-register",
  authUser,
  hasAccess(["user"]),
  userController.otpRegistration
);
router.post("/send-otp", authUser, userController.sendOtp);
router.post("/logout", userController.logout);
router.get(
  "/profile",
  authUser,
  hasAccess(["user"]),
  userController.userProfilePage
);
router.patch(
  "/profile-update",
  authUser,
  hasAccess(["user"]),
  userController.userProfileUpdate
);
router.patch("/password-reset", authUser, userController.passwordReset);
router.get(
  "/recipe",
  authUser,
  hasAccess(["user"]),
  userController.userRecipePage
);

export default router;
