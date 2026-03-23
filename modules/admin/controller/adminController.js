const adminService = require('../service/adminService');

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getFreelancers = async (req, res, next) => {
  try {
    const freelancers = await adminService.getAllFreelancersAdmin();
    res.json(freelancers);
  } catch (error) {
    next(error);
  }
};

const approveVendor = async (req, res, next) => {
  try {
    const freelancer = await adminService.approveFreelancer(req.params.id);
    res.json(freelancer);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getFreelancers, approveVendor };
