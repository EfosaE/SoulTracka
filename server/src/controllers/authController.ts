import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient';
import { asyncHandler } from '../utils/asyncHandler';
import AppError from '../utils/appError';
import { verifyToken } from '../utils/verifyToken';

const createAccessToken = (id: string) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
  });
};

const createRefreshToken = (id: string) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });
};

export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });

    return res.status(201).json({
      status: 'success',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = { ...req.user };
    console.log(user);
    if (!user) {
      return next(new AppError('Please login', 400));
    }
    const refreshToken = createRefreshToken(user.id);
    const accessToken = createAccessToken(user.id);

    res.cookie('refreshCookie', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      status: 'success',
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      },
      accessToken,
    });
  }
);

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken: string = req.cookies.refreshCookie;

  if (!refreshToken) {
    return next(new AppError('please login to proceed', 401));
  }
  try {
    const decoded = await verifyToken(
      refreshToken,
      `${process.env.JWT_SECRET}`
    );

    console.log(decoded);
    if (decoded && typeof decoded !== 'string') {
      const accessToken = createAccessToken(decoded.id);
      res.json({accessToken})
    }
    
  } catch (error) {
    if (error) {
      return next(new AppError('Login expired, please login again', 403));
    }
  }
};

export const logOut = async (req: Request, res: Response) => {
  res.cookie('refreshCookie', '', {
    maxAge: 1,
    httpOnly: true,
    // expires: new Date(Date.now() + 1),
  });
    res.sendStatus(204);
};
