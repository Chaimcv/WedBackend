const guestService = require('../service/guestService');
const { sendWhatsAppMessage } = require('../../whatsapp/service/whatsappService');

const createGuest = async (req, res, next) => {
  try {
    const guest = await guestService.addGuest(req.body);
    res.status(201).json(guest);
  } catch (error) {
    next(error);
  }
};

const getAllGuests = async (req, res, next) => {
  try {
    const guests = await guestService.getWeddingGuests(req.params.weddingId);
    res.json(guests);
  } catch (error) {
    next(error);
  }
};

const sendManualReminder = async (req, res, next) => {
  try {
    const { guestId, message } = req.body;
    const Guest = require('../model/guest.model');
    const guest = await Guest.findById(guestId);
    if (!guest) throw new Error('Guest not found');

    await sendWhatsAppMessage(guest.phoneNumber, message);
    guest.reminderStatus = 'sent';
    await guest.save();

    res.json({ message: 'Reminder sent' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGuest, getAllGuests, sendManualReminder };
