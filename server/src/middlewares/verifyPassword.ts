import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';
import { comparePassword } from '../utils/passwordHashing';
import AppError from '../utils/appError';
import { asyncHandler } from '../utils/asyncHandler';

export default asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return next(new AppError('Invalid credentials', 403));
    }

    const isPasswordValid = await comparePassword(user.password, password);

    if (!isPasswordValid) {
      return next(new AppError('Invalid credentials', 403));
    }
    req.user = user;
    next();
  }
);
