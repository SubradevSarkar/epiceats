const genOtp = (limit) => {
  const digit = !limit ? 6 : limit;
  const otp = Math.floor(Math.random() * Math.pow(10, digit) + 1);
  return otp;
};
const isOtpExpire = (date) => {
  const time = new Date(date).getTime();
  const current = Date.now();
  const limit = process.env.OTP_EXPIRE_LIMIT * 1000;
  const diff = Math.abs(current - time);
  console.log(time, current, diff, limit);
  if (diff <= limit) return false;
  return true;
};

export { genOtp, isOtpExpire };
