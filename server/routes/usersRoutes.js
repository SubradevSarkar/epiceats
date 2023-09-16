const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// router.get("/", (req, res) => {});
router.get("/login", userController.loginPage);
router.post("/login", userController.login);
router.get("/register", userController.registerPage);
router.post("/register", userController.register);
router.post("/otp-register", protect, userController.otpRegister);
router.post("/logout", (req, res) => {});

module.exports = router;
