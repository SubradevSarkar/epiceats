const userModel = require("../models/UserModel");
const { verifyToken } = require("../utils/manageToken");

const protect = async (req, res, next) => {
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
    res.status(401);
    throw new Error("Not authorized, No token");
  }
};

module.exports = protect;
