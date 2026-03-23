const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const { checkAndSendReminders } = require('./modules/notifications/service/reminderService');

const startServer = async () => {
  try {
    // Connect to Databases
    await connectDB();
    connectRedis().catch(err => console.error('Redis background error:', err));

    // Start automated services
    checkAndSendReminders();

    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`Server running in ${config.env} mode on port ${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
