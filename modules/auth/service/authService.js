const User = require('../../users/model/user.model');
const Auth = require('../model/auth.model');
const { generateToken } = require('../../../utils/jwt');
const { generateOTP } = require('../../../utils/otp');

const signup = async (userData) => {
  const { fullName, email, password, phoneNumber, role } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    fullName,
    email,
    password,
    phoneNumber,
    role: role || 'user',
  });

  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Optionally create/update session in Auth model
    await Auth.findOneAndUpdate(
      { userId: user._id },
      { loginMethod: 'email' },
      { upsert: true }
    );

    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

const sendOTP = async (phone) => {
  const user = await User.findOne({ phoneNumber: phone });
  if (!user) {
    throw new Error('User not found with this phone number');
  }

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  await Auth.findOneAndUpdate(
    { userId: user._id },
    {
      otpCode: otp,
      otpExpiry,
      loginMethod: 'phone',
    },
    { upsert: true }
  );

  // In production, send via Twilio
  console.log(`OTP for ${phone}: ${otp}`);
  return otp;
};

const verifyAndLogin = async (phone, otp) => {
  const user = await User.findOne({ phoneNumber: phone });
  if (!user) {
    throw new Error('User not found with this phone number');
  }

  const authRecord = await Auth.findOne({
    userId: user._id,
    otpCode: otp,
    otpExpiry: { $gt: new Date() },
  });

  if (!authRecord) {
    throw new Error('Invalid or expired OTP');
  }

  // Clear OTP after successful login
  authRecord.otpCode = undefined;
  authRecord.otpExpiry = undefined;
  await authRecord.save();

  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  };
};

module.exports = { signup, login, sendOTP, verifyAndLogin };
