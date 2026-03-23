const authService = require('../service/authService');

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const requestOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;
    await authService.sendOTP(phone);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    const user = await authService.verifyAndLogin(phone, otp);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, authUser, requestOTP, verifyOTP };
