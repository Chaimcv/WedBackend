const Vendor = require('../model/vendor.model');

const createVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (error) {
    next(error);
  }
};

const getVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

module.exports = { createVendor, getVendors };
