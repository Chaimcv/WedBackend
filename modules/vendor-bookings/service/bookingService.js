const VendorBooking = require('../model/vendorBooking.model');

const createBooking = async (data) => {
  return await VendorBooking.create(data);
};

const updateBookingStatus = async (id, bookingStatus) => {
  return await VendorBooking.findByIdAndUpdate(id, { bookingStatus }, { new: true });
};

const getWeddingBookings = async (weddingId) => {
  return await VendorBooking.find({ weddingId }).populate({
    path: 'vendorId',
    select: 'vendorName category phoneNumber'
  });
};

const getVendorBookings = async (vendorId) => {
  return await VendorBooking.find({ vendorId }).populate('weddingId', 'weddingTitle');
};

module.exports = { createBooking, updateBookingStatus, getWeddingBookings, getVendorBookings };
