import AppError from '../utils/appError';
import { asyncHandler } from '../utils/asyncHandler';
import prisma from '../utils/prismaClient';
import { NextFunction, Request, Response } from 'express';
import { firstTimerSchema } from '../utils/zodSchema';

export const getAllFirstTimers = asyncHandler(
  async (req: Request, res: Response) => {
    const firstTimers = await prisma.firstTimer.findMany();
    return res.status(200).json({
      status: 'success',
      firstTimers,
    });
  }
);

export const createFirstTimer = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const validatedData = firstTimerSchema.parse(req.body);
    console.log(validatedData);
    const firstTimer = await prisma.firstTimer.create({
      data: validatedData,
    });
     return res.status(201).json({
       status: 'success',
       firstTimer
     });
  }
);
