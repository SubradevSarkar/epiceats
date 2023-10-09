import url from "url";
import { validateForm } from "../utils/manageFormValidation.js";
import { generateToken, verifyToken } from "../utils/manageToken.js";
import { encryptPassword, matchPassword } from "../utils/managePassword.js";
import { genOtp, isOtpExpire } from "../utils/manageOtp.js";
import { sendEmail, emailTopic } from "../utils/manageEmail.js";
import asyncHandler from "../utils/asyncHandler.js";
import userModel from "../models/UserModel.js";
import recipeModel from "../models/RecipeModel.js";

/**
 * GET /user/login
 * LoginPage
 */
const loginPage = asyncHandler(async (req, res, next) => {
  const infoSuccessMessage = req.flash("infoSuccess");
  const infoFailureMessage = req.flash("infoFailure");

  res.status(200).render("login", {
    title: "epiceats - Login",
    infoSuccessMessage,
    infoFailureMessage,
  });
});

/**
 * POST /user/login
 * Login
 */
const login = asyncHandler(async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const searchTerm = userName.includes("@")
      ? { email: userName }
      : { userName };

    const { isValid, errorMessage } = validateForm({ userName, password });
    if (!isValid) {
      throw new Error(errorMessage);
    }

    const user = await userModel.findOne(searchTerm);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    if (!(await matchPassword(password, user.password))) {
      throw new Error("Invalid username or password");
    }

    if (!user.isActive) {
      throw new Error("Account does not exist");
    }

    await generateToken(user, res);
    res.redirect("/");
  } catch (error) {
    req.flash("infoFailure", error.message);
    res.redirect("/user/login");
  }
});

/**
 * POST /user/logout
 * Logout
 */
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ redirect: "/" });
});

/**
 * GET /user/register
 * Register
 */
const registrationPage = asyncHandler(async (req, res, nest) => {
  let step = req.query?.regstep;
  let email = "";
  step = !step ? 1 : Number(step);

  if (step === 2) {
    let user = req?.user;

    if (user) {
      email = user.email ? user.email : "";
    } else {
      return res.redirect("/");
    }
  }

  const infoSuccessMessage = req.flash("infoSuccess");
  const infoFailureMessage = req.flash("infoFailure");

  res.status(200).render("register", {
    title: "epiceats - Register",
    step,
    email,
    infoFailureMessage,
    infoSuccessMessage,
  });
});

/**
 * POST /user/register
 * Register
 */
const registration = asyncHandler(async (req, res, next) => {
  try {
    const userData = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.conPassword,
    };

    const { isValid, errorMessage } = validateForm(userData);
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
      await sendEmail({
        email: user.email,
        username: `${user.firstName + " " + user.lastName}`,
        otp: user.verificationCode.code,
        topic: "regOtp",
      });
      req.flash("infoSuccess", "Check your email for OTP confirmation!");

      res.status(201).json({ redirect: "/user/register?regstep=2" });
    } else {
      res.status(400);
      throw new Error("Invalid User");
    }
  } catch (error) {
    req.flash("infoFailure", error.message);
    throw new Error(error.message);
  }
});

/**
 * POST /user/otp-register
 * Register
 */
const otpRegistration = asyncHandler(async (req, res, next) => {
  try {
    const otp = Number(req.body.otp);
    const { code, createdAt } = req.user.verificationCode;

    if (otp === code && !isOtpExpire(createdAt)) {
      const user = await userModel.findById(req.user._id);
      user.isActive = true;
      user.isRegistered = true;
      await user.save();
      res.status(200).json({ redirect: "/" });
    } else {
      res.status(400);
      throw new Error("OTP not match");
    }
  } catch (error) {
    req.flash("infoFailure", error.message);
    throw new Error(error.message);
  }
});

/**
 * GET /user/profile
 * user profile page
 */
const userProfilePage = asyncHandler(async (req, res, next) => {
  const userData = req.user;

  const infoSuccessMessage = req.flash("infoSuccess");
  const infoFailureMessage = req.flash("infoFailure");
  res.status(200).render("myProfile", {
    title: "epiceats - Profile",
    userData,
    infoSuccessMessage,
    infoFailureMessage,
  });
});

/**
 * PATCH /user/profile-update
 ** user profile update
 */

const userProfileUpdate = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;

    let state = null;
    const { isValid, errorMessage } = validateForm(body);
    if (!isValid) {
      throw new Error(errorMessage);
    }
    const user = await userModel.findById(req.user._id);
    if (!user) {
      throw new Error("user not valid");
    }

    if (body.userName) {
      const isUserExists = await userModel.findOne(body).lean();
      if (isUserExists && isUserExists._id !== user._id) {
        throw new Error("UserName already in used");
      } else {
        user.userName = body.userName;
        await user.save();
        state = "Username";
      }
    }

    if (body.firstName) {
      user.firstName = body.firstName;
      await user.save();
      state = "Firstname";
    }

    if (body.lastName) {
      user.lastName = body.lastName;
      await user.save();
      state = "Lastname";
    }

    // update email address =================================================================
    // if (body.email) {
    //   user.email = body.email;
    //   await user.save();
    //   state = "email";
    // }
    req.flash("infoSuccess", `${state} update successfully`);
    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    req.flash("infoFailure", error.message);
    throw new Error(error.message);
  }
});

/**
 * POST /user/send-otp
 * send or resend otp
 */
const sendOtp = asyncHandler(async (req, res, next) => {
  let email = req?.user?.email || req?.body?.email;
  const otp = genOtp();
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  user.verificationCode = {
    code: otp,
    createdAt: Date.now(),
  };

  await user.save();
  await sendEmail({
    email: user.email,
    username: `${user.firstName + " " + user.lastName}`,
    otp: user.verificationCode.code,
    topic: emailTopic.otp,
  });
  res.status(200).json({ message: "please check your email for OTP" });
});

/**
 * POST /user/password-reset
 * user password reset
 */
const passwordReset = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const otp = Number(req.body.otp);
    let user = null;

    const { isValid, errorMessage } = validateForm(body);
    if (!isValid) {
      throw new Error(errorMessage);
    }

    if (req.user) {
      user = await userModel.findById(req.user._id);
    } else {
      user = await userModel.findOne({ email: body.email });
    }

    if (!user) {
      throw new Error("user not valid");
    }

    if (user && !user.isActive) {
      throw new Error("User not allowed");
    }

    const { code, createdAt } = user.verificationCode;

    if (otp === code && !isOtpExpire(createdAt)) {
      user.password = await encryptPassword(body.password.trim());
      await user.save();
    } else {
      res.status(400);
      throw new Error("OTP not match");
    }

    req.flash("infoSuccess", `password update successfully`);
    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    req.flash("infoFailure", error.message);
    throw new Error(error.message);
  }
});

/**
 * GET /user/recipe
 * user recipe
 */
const userRecipePage = asyncHandler(async (req, res, next) => {
  const infoSuccessMessage = req.flash("infoSuccess");
  const infoFailureMessage = req.flash("infoFailure");

  const recipes = await recipeModel
    .find({ userId: req.user._id })
    .sort({ _id: -1 })
    .limit(20)
    .lean();

  res.render("myRecipe", {
    title: "epiceats - myrecipe",
    recipes,
    infoSuccessMessage,
    infoFailureMessage,
  });
});

export {
  loginPage,
  login,
  logout,
  registrationPage,
  registration,
  otpRegistration,
  sendOtp,
  userProfilePage,
  userProfileUpdate,
  passwordReset,
  userRecipePage,
};
