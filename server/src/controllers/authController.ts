import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient';
import { asyncHandler } from '../utils/asyncHandler';
import AppError from '../utils/appError';

const createToken = (id: string) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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
    const token = createToken(newUser.id);
    res.cookie('jwt', token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
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
    const token = createToken(user.id);
    res.cookie('jwt', token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({
      status: 'success',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  }
);


export const logOut = async (req:Request, res:Response) => {
    res.cookie('jwt', '', {
      maxAge: 1,
      httpOnly: true,
      // expires: new Date(Date.now() + 1),
    });
    res.status(200).json({ status: 'success' });
}