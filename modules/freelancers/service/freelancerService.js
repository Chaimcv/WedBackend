const Freelancer = require('../model/Freelancer');

const createOrUpdateProfile = async (userId, data) => {
  let profile = await Freelancer.findOne({ userId });
  if (profile) {
    Object.assign(profile, data);
    return await profile.save();
  }
  return await Freelancer.create({ userId, ...data });
};

const getFreelancers = async (filters = {}) => {
  const query = { isApproved: true };
  if (filters.category) query.category = filters.category;
  if (filters.city) query.city = new RegExp(filters.city, 'i');

  return await Freelancer.find(query).populate('userId', 'name email profilePic');
};

const getFreelancerById = async (id) => {
  return await Freelancer.findById(id).populate('userId', 'name email profilePic');
};

module.exports = { createOrUpdateProfile, getFreelancers, getFreelancerById };
