const Whatsapp = require('../model/whatsapp.model');

const getMessageLogs = async (req, res, next) => {
  try {
    const logs = await Whatsapp.find({ userId: req.user.id }).sort('-sentAt');
    res.json(logs);
  } catch (error) {
    next(error);
  }
};

module.exports = { getMessageLogs };
