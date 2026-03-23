const User = require('../model/user.model');

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.email = req.body.email || user.email;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.profileImage = req.body.profileImage || user.profileImage;
      user.weddingDate = req.body.weddingDate || user.weddingDate;
      user.weddingLocation = req.body.weddingLocation || user.weddingLocation;
      user.budgetRange = req.body.budgetRange || user.budgetRange;

      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        token: require('../../../utils/jwt').generateToken(updatedUser._id, updatedUser.role),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile, updateUserProfile };
