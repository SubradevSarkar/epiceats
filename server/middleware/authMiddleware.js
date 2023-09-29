import userModel from "../models/UserModel.js";
import { verifyToken } from "../utils/manageToken.js";
import asyncHandler from "../utils/asyncHandler.js";

const authUser = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decode = await verifyToken(token);
      const user = await userModel.findById(decode.userId).select("-password");
      if (!user) {
        throw new Error("User not found");
      } else {
        req.user = user;
        return next();
      }
    } catch (error) {
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(401);
      throw new Error("Not authorized, token not valid");
    }
  } else {
    res.status(401);
    return next();
    // throw new Error("Not authorized, No token");
  }
});

const authCredentialsViewEngine = async (req, res, next) => {
  let token = req.cookies.jwt;
  let user = null;
  if (token) {
    try {
      const decode = await verifyToken(token);
      user = await userModel.findById(decode.userId).select("-password");
      if (user.isRegistered) {
        res.locals.user = user;
      } else {
        res.locals.user = null;
      }
      return next();
    } catch (error) {
      res.status(401);
      res.locals.user = null;
      return next();
    }
  } else {
    res.status(401);
    res.locals.user = null;
    return next();
  }
};

const hasAccess = ([...roles]) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect("/user/login");
    }

    if (req.user.isAdmin || roles.includes(req.user.role)) {
      return next();
    } else {
      return res.redirect("/");
    }
  };
};

const isAllowed = (allow) => {
  return function (req, res, next) {
    allow = allow || true;
    const isRegistered = req?.user?.isActive && req?.user?.isRegistered;

    if (allow && !req.user) {
      return next();
    } else {
      if (!isRegistered) {
        return next();
      }

      return res.redirect("/");
    }
  };
};

export { authUser, authCredentialsViewEngine, isAllowed, hasAccess };
