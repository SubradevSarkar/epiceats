import url from "url";
import {
  validateRegistrationForm,
  validateLoginForm,
} from "../utils/manageFormValidation.js";
import { generateToken, verifyToken } from "../utils/manageToken.js";
import { encryptPassword, matchPassword } from "../utils/managePassword.js";
import { genOtp, isOtpExpire } from "../utils/manageOtp.js";
import { sendEmail } from "../utils/manageEmail.js";
import userModel from "../models/UserModel.js";

/**
 * GET /user/login
 * LoginPage
 */
const loginPage = async (req, res) => {
  try {
    const infoSuccessMessage = req.flash("infoSuccess");
    const infoFailureMessage = req.flash("infoFailure");

    res.render("login", { infoSuccessMessage, infoFailureMessage });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * POST /user/login
 * Login
 */
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const searchTerm = userName.includes("@")
      ? { email: userName }
      : { userName };

    const { isValid, errorMessage } = validateLoginForm({ userName, password });
    if (!isValid) {
      throw new Error(errorMessage);
    }

    const user = await userModel.findOne(searchTerm);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    if (!matchPassword(password, user.password)) {
      throw new Error("Invalid username or password");
    }

    await generateToken(user, res);
    res.redirect("/");
  } catch (error) {
    req.flash("infoFailure", error.message);
  }
};

/**
 * POST /user/logout
 * Logout
 */
const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.redirect("/");
};

/**
 * GET /user/register
 * Register
 */
const registrationPage = async (req, res) => {
  try {
    let step = req.query.step;
    let email = "";
    step = !step ? 1 : Number(step);

    if (step === 2) {
      let decode = await verifyToken(req.cookies.jwt);
      email = decode.email ? decode.email : "";
    }
    const infoSuccessMessage = req.flash("infoSuccess");
    const infoFailureMessage = req.flash("infoFailure");

    res.render("register", {
      title: "epiceats - register",
      step,
      email,
      infoFailureMessage,
      infoSuccessMessage,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * POST /user/register
 * Register
 */
const registration = async (req, res) => {
  try {
    const userData = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.conPassword,
    };

    const { isValid, errorMessage } = validateRegistrationForm(userData);
    if (!isValid) {
      throw new Error(errorMessage);
    }

    const isUserExist = await userModel.findOne({
      $or: [{ userName: userData.userName }, { email: userData.email }],
    });

    if (isUserExist) {
      throw new Error("User already registered");
    }

    userData.password = await encryptPassword(userData.password);
    userData.verificationCode = {
      code: genOtp(),
    };
    userData.authMode = "email";
    const user = await userModel.create(userData);
    if (user) {
      await generateToken(user, res);
      // await sendEmail({
      //   email: user.email,
      //   context: `HI ${user.firstName}
      //   here is your one-time password
      //   ${user.verificationCode.code}`,
      // });
      req.flash("infoSuccess", "Check your email for OTP confirmation!");
      res.redirect(
        url.format({
          pathname: "/user/register",
          query: { step: 2 },
        })
      );
    } else {
      res.status(400);
      throw new Error("Invalid User");
    }
  } catch (error) {
    req.flash("infoFailure", error.message);
    // res.redirect("/user/register");
  }
};

/**
 * POST /user/otp-register
 * Register
 */
const otpRegistration = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const { code, createdAt } = req.user.verificationCode;

    if (otp === code && !isOtpExpire(createdAt)) {
      const user = await userModel.findById(req.user._id);
      user.isActive = true;

      await user.save();
      res.redirect("/");
    } else {
      res.status(400);
      throw new Error("OTP not match");
    }
  } catch (error) {
    req.flash("infoFailure", error.message);
    res.redirect(
      url.format({
        pathname: "/user/register",
        query: { step: 2 },
      })
    );
  }
};

/**
 * POST /user/otp-resend
 * resend otp
 */
const resendOtp = async (req, res) => {
  console.log("send otp");
  res.json({ data: "otp sent" });
};

export {
  loginPage,
  login,
  logout,
  registrationPage,
  registration,
  otpRegistration,
  resendOtp,
};
