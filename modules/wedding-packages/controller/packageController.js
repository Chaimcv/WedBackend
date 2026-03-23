const packageService = require('../service/packageService');

const createWeddingPackage = async (req, res, next) => {
  try {
    const weddingPackage = await packageService.createPackage(req.body);
    res.status(201).json(weddingPackage);
  } catch (error) {
    next(error);
  }
};

const getAllPackages = async (req, res, next) => {
  try {
    const packages = await packageService.getPackages();
    res.json(packages);
  } catch (error) {
    next(error);
  }
};

const getPackage = async (req, res, next) => {
  try {
    const weddingPackage = await packageService.getPackageById(req.params.id);
    if (!weddingPackage) {
      res.status(404);
      throw new Error('Package not found');
    }
    res.json(weddingPackage);
  } catch (error) {
    next(error);
  }
};

module.exports = { createWeddingPackage, getAllPackages, getPackage };
