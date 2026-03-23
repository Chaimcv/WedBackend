const Guest = require('../model/guest.model');

const addGuest = async (data) => {
  return await Guest.create(data);
};

const getWeddingGuests = async (weddingId) => {
  return await Guest.find({ weddingId });
};

const updateGuest = async (id, data) => {
  return await Guest.findByIdAndUpdate(id, data, { new: true });
};

module.exports = { addGuest, getWeddingGuests, updateGuest };
