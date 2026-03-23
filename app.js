const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const config = require('./config');
const passport = require('./config/passport');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Swagger Config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Destination Wedding Planning Platform API',
      version: '1.0.0',
      description: 'Production-ready backend for destination wedding planning',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./modules/**/*.routes.js'], // Look for routes in modular structure
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base Route
app.get('/', (req, res) => {
  res.send('AI Destination Wedding API is running...');
});

// Import Routes
app.use('/api/auth', require('./modules/auth/routes/auth.routes'));
app.use('/api/users', require('./modules/users/routes/user.routes'));
app.use('/api/admin', require('./modules/admin/routes/admin.routes'));
app.use('/api/freelancers', require('./modules/freelancers/routes/freelancer.routes'));
app.use('/api/packages', require('./modules/wedding-packages/routes/package.routes'));
app.use('/api/weddings', require('./modules/weddings/routes/wedding.routes'));
app.use('/api/events', require('./modules/events/routes/event.routes'));
app.use('/api/food-planner', require('./modules/food-planner/routes/food.routes'));
app.use('/api/destinations', require('./modules/destination/routes/destination.routes'));
app.use('/api/bookings', require('./modules/vendor-bookings/routes/booking.routes'));
app.use('/api/ratings', require('./modules/ratings/routes/rating.routes'));
app.use('/api/guests', require('./modules/guests/routes/guest.routes'));
app.use('/api/ai', require('./modules/ai-planner/routes/ai.routes'));

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
