import jwt from "jsonwebtoken";
const tokenSecret = process.env.JWT_SECRET;

const generateToken = async (user, res) => {
  const userData = { userId: user._id, email: user.email };
  const token = jwt.sign(userData, tokenSecret, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

const verifyToken = async (token) => {
  const decode = await jwt.verify(token, tokenSecret);
  return decode;
};

export { generateToken, verifyToken };
