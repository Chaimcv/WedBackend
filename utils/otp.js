const { client } = require('../config/redis');
const config = require('../config');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const storeOTP = async (phone, otp) => {
  await client.set(`otp:${phone}`, otp, {
    EX: config.otpExpiry,
  });
};

const verifyOTP = async (phone, otp) => {
  const storedOtp = await client.get(`otp:${phone}`);
  if (storedOtp === otp) {
    await client.del(`otp:${phone}`);
    return true;
  }
  return false;
};

module.exports = { generateOTP, storeOTP, verifyOTP };
