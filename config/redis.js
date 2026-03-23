const { createClient } = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const client = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 5) return new Error('Retry limit reached');
      return 1000;
    }
  }
});

client.on('error', (err) => {
    // console.log('Redis Client Error', err.message);
});

const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Redis Connected');
  } catch (error) {
    console.warn('Redis connection failed. Features like OTP and Rate Limiting will use fallback.');
  }
};

module.exports = { client, connectRedis };
