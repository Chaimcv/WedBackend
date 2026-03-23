const twilio = require('twilio');
const config = require('../../../config');

let client;
if (config.twilio.accountSid && config.twilio.accountSid.startsWith('AC')) {
  client = twilio(config.twilio.accountSid, config.twilio.authToken);
} else {
  console.warn('Twilio Account SID is missing or invalid. WhatsApp messaging will be disabled.');
}

const sendWhatsAppMessage = async (to, body) => {
  if (!client) {
    console.log(`[MOCK WHATSAPP] To: ${to}, Body: ${body}`);
    return { sid: 'mock_sid' };
  }
  try {
    const message = await client.messages.create({
      from: config.twilio.whatsappNumber,
      to: `whatsapp:${to}`,
      body: body,
    });
    return message;
  } catch (error) {
    console.error('WhatsApp Error:', error.message);
    throw error;
  }
};

module.exports = { sendWhatsAppMessage };
