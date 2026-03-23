const User = require('../../users/model/user.model');
const Freelancer = require('../../freelancers/model/Freelancer');

const getAllUsers = async () => {
  return await User.find({ role: 'user' }).select('-password');
};

const getAllFreelancersAdmin = async () => {
  return await Freelancer.find().populate('userId', 'name email');
};

const approveFreelancer = async (id) => {
  const freelancer = await Freelancer.findById(id);
  if (!freelancer) throw new Error('Freelancer not found');
  freelancer.isApproved = true;
  return await freelancer.save();
};

module.exports = { getAllUsers, getAllFreelancersAdmin, approveFreelancer };
