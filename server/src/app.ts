import express from 'express';
import outreachRouter from './routes/outreachContactRoute';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import firstTimerRouter from './routes/firstTimerRoute';
import userRouter from './routes/userRoute';
import cookieParser from 'cookie-parser'

// Create an Express application
const app = express();
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