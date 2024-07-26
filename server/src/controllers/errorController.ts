// import AppError from '../utils/appError';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { Prisma } from '@prisma/client';

const handlePrismaError = (err: any) => {
  switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      return new AppError(`Duplicate field value: ${err.meta.target}`, 400);
    case 'P2014':
      // handling invalid id errors
      return new AppError(`Invalid ID: ${err.meta.target}`, 400);
    case 'P2003':
      // handling invalid data errors
      return new AppError(`Invalid input data: ${err.meta.target}`, 400);
    default:
      // handling all other errors
      return new AppError(`Something went wrong: ${err.message}`, 500);
  }
};

const sendErrorDev = (err: any, req: Request, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    //rendered website
    res
      .status(err.statusCode)
      .render('error', { title: 'Something went wrong!', msg: err.message });
  }
};

const sendErrorProd = (err: any, req: Request, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    // it is from AppError class but I want to ensure it is a cliemt side error
    if (err.isOperational) {
      return res
        .status(err.statusCode)
        .json({ status: err.status, message: err.message });
    }

    //programming errors dont leak details
    console.error('ERROR 💥', err);

    return res.status(500).json({
      status: ' error',
      message: 'somethin went wrong, please try again later',
    });
  }
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  console.log(err);
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log('handledPrismaError');
      error = handlePrismaError(err);
    }
    sendErrorProd(error, req, res);
  }
};

export default globalErrorHandler;
