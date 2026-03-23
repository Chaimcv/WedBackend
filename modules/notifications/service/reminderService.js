const Event = require('../../events/model/Event');
const Guest = require('../../guests/model/guest.model');
const { sendWhatsAppMessage } = require('../../whatsapp/service/whatsappService');

const checkAndSendReminders = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const nextDay = new Date(tomorrow);
  nextDay.setDate(nextDay.getDate() + 1);

  try {
    const events = await Event.find({
      date: { $gte: tomorrow, $lt: nextDay },
    });

    for (const event of events) {
      const guests = await Guest.find({ weddingId: event.weddingId, isInvited: true, reminderSent: false });
      for (const guest of guests) {
        const body = `Hi ${guest.name}, this is a reminder for the ${event.name} event on ${event.date.toDateString()}. We look forward to seeing you there!`;
        await sendWhatsAppMessage(guest.phone, body);
        guest.reminderSent = true;
        await guest.save();
      }
    }
  } catch (error) {
    console.error('Reminder Service Error:', error.message);
  }
};

// Run every 6 hours
setInterval(checkAndSendReminders, 6 * 60 * 60 * 1000);

module.exports = { checkAndSendReminders };
