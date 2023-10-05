import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  const genSalt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, genSalt);
  return encryptedPassword;
};
const matchPassword = async (password, encryptedPassword) => {
  const isPasswordMatch = await bcrypt.compare(password, encryptedPassword);
  return isPasswordMatch;
};

export { encryptPassword, matchPassword };
