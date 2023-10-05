import mongoose from "mongoose";
const otpExpiryLimit = process.env.OTP_EXPIRE_LIMIT;

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
    },
    authMode: {
      type: String,
      required: true,
      enum: ["email", "google"],
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user", "moderator"],
    },
    verificationCode: {
      code: { type: Number },
      createdAt: { type: Date, default: Date.now() },
      expiryLimit: { type: Number, default: otpExpiryLimit },
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    isRegistered: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    dpUrl: {
      type: String,
    },
    extraData: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
