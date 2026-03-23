const WeddingPackage = require('../model/package.model');

const createPackage = async (data) => {
  return await WeddingPackage.create(data);
};

const getPackages = async () => {
  return await WeddingPackage.find();
};

const getPackageById = async (id) => {
  return await WeddingPackage.findById(id);
};

module.exports = { createPackage, getPackages, getPackageById };
