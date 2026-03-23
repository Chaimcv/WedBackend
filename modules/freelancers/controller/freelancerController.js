const freelancerService = require('../service/freelancerService');

const updateProfile = async (req, res, next) => {
  try {
    const profile = await freelancerService.createOrUpdateProfile(req.user.id, req.body);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

const getAllFreelancers = async (req, res, next) => {
  try {
    const freelancers = await freelancerService.getFreelancers(req.query);
    res.json(freelancers);
  } catch (error) {
    next(error);
  }
};

const getFreelancer = async (req, res, next) => {
  try {
    const freelancer = await freelancerService.getFreelancerById(req.params.id);
    if (!freelancer) {
      res.status(404);
      throw new Error('Freelancer not found');
    }
    res.json(freelancer);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateProfile, getAllFreelancers, getFreelancer };
