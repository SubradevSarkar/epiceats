const url = require("url");
const validateRegistrationForm = require("../utils/regFormValidation");
const { generateToken } = require("../utils/manageToken");
const { encryptPassword } = require("../utils/managePassword");
const { genOtp } = require("../utils/manageOtp");
const { sendEmail } = require("../utils/manageEmail");
const userModel = require("../models/UserModel");

exports.loginPage = async (req, res) => {
  res.render("login");
};

exports.login = async () => {};

/**
 * GET /user/register
 * Register
 */
exports.registerPage = async (req, res) => {
  try {
    let step = req.query.step;
    step = !step ? 1 : Number(step);
    const email = step === 2 ? req.session.data["email"] : "";
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
exports.register = async (req, res) => {
  try {
    const userData = {
      userName: req.body.username,
      firstName: req.body.fname,
      lastName: req.body.lname,
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
      req.session.data = { email: user.email };
      await sendEmail({
        email: user.email,
        context: `HI ${user.firstName}
        here is your one-time password
        ${user.verificationCode.code}`,
      });
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
    res.redirect("/user/register");
  }
};

/**
 * POST /user/otp-register
 * Register
 */
exports.otpRegister = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    const { code, createdAt, expiryLimit } = req.user.verificationCode;

    console.log(Date.now() - createdAt);

    if (otp === code) {
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
