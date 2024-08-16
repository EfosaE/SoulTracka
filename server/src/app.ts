import express from 'express';
import outreachRouter from './routes/outreachContactRoute';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import firstTimerRouter from './routes/firstTimerRoute';
import userRouter from './routes/userRoute';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import rateLimit from 'express-rate-limit';

// Create an Express application
const app = express();

// Define the allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://soultracka.netlify.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
// Define the rate limiter middleware
const limiter = rateLimit({
  max: 50, // Limit each IP to 10 requests per `window` (here, per hour)
  windowMs:  60 * 60 * 1000, // 1 hour window
  message: 'Too many requests, please try again later.', // Message sent when limit is reached
});
// Apply the rate limiter to all requests starting with /api/
app.use('/api', limiter);
app.use(express.json());

// Use cookie parser middleware
app.use(cookieParser());

// Define a route for the root path ('/')
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello, TypeScript + Node.js + Express!');
});

app.use('/api/v1/outreach-contacts', outreachRouter);
app.use('/api/v1/first-timers', firstTimerRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`cant find api path ${req.originalUrl}`, 404))
})

// Global error handling middleware
app.use(globalErrorHandler)
export default app