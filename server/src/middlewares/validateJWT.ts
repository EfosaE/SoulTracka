import { Request, Response, NextFunction } from 'express';

import { asyncHandler } from '../utils/asyncHandler';
import AppError from '../utils/appError';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

function verifyToken(
  token: string,
  secret: string
): Promise<string | JwtPayload | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    console.log(token);

    if (!token) {
      return next(new AppError('please login to proceed', 403));
    }

    try {
      const decoded = await verifyToken(token, `${process.env.JWT_SECRET}`);
      console.log(decoded)
      if (decoded && typeof decoded !== 'string') {
        req.payload = decoded as JwtPayload;
      }
      next();
    } catch (error) {
      if (error) {
        return next(new AppError('Login expired, please login again', 403));
      }
    }
  }
);
