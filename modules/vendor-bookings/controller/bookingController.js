const bookingService = require('../service/bookingService');

const requestBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
    res.json(booking);
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    // If vendor, show theirs; if user, show by wedding
    if (req.user.role === 'vendor') {
        // Need to find vendor ID from user ID
        const Vendor = require('../../vendors/model/vendor.model');
        const vendor = await Vendor.findOne({ userId: req.user.id });
        const bookings = await bookingService.getVendorBookings(vendor._id);
        res.json(bookings);
    } else {
        const bookings = await bookingService.getWeddingBookings(req.query.weddingId);
        res.json(bookings);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { requestBooking, updateStatus, getMyBookings };
