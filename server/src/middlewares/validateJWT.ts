import { Request, Response, NextFunction } from 'express';

import { asyncHandler } from '../utils/asyncHandler';
import AppError from '../utils/appError';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
      return next(new AppError('please login to proceed', 403));
    }
    jwt.verify(
      token,
      `${process.env.JWT_SECRET}`,
      (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        if (err || !decoded) {
          return next(new AppError('Login expired, please login again', 403));
        }

        console.log(decoded);
         if (decoded && typeof decoded !== 'string') {
           req.payload = decoded as JwtPayload;
         }
        next();
      }
    );
  }
);
