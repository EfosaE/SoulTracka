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
export const deleteFirstTimerByID = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    // Attempt to delete the contact
    const firstTimer = await prisma.firstTimer.delete({
      where: {
        id,
      },
    });

    // If the contact doesn't exist, it will throw an error, but you can handle it more gracefully
    if (!firstTimer) {
      return next(new AppError('No contact found with this ID', 404));
    }

    return res.sendStatus(204)// Sends a 204 No Content response
  }
);

export const updateFirstTimer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const updates = { ...req.body };
    const {
      name,
      address,
      phoneNumber,
      occupation,
      isStudent
    } = updates;
    const firstTimer = await prisma.firstTimer.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        phoneNumber,
        occupation,
        isStudent,
      },
    });
    return res.status(200).json({
      status: 'success',
      firstTimer,
    });
  }
);