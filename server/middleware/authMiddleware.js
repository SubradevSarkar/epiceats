import userModel from "../models/UserModel.js";
import { verifyToken } from "../utils/manageToken.js";

const authUser = async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    try {
      const decode = await verifyToken(token);
      req.user = await userModel.findById(decode.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token not valid");
    }
  } else {
    next();
    res.status(401);
    // throw new Error("Not authorized, No token");
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

export { authUser, hasAccess };
