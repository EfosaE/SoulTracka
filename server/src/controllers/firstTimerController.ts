import AppError from '../utils/appError';
import { asyncHandler } from '../utils/asyncHandler';
import prisma from '../utils/prismaClient';
import { NextFunction, Request, Response } from 'express';


export const getAllFirstTimers = asyncHandler(async (req: Request, res: Response) => {
    const firstTimers = await prisma.firstTimer.findMany()
    return res.status(200).json({
        status: 'success',
        firstTimers
    })
});