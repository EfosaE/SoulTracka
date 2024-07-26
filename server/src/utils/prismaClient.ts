import { PrismaClient } from '@prisma/client';
import AppError from './appError';
import { hashPassword } from './passwordHashing';

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ model, operation, args, query }) {
        if (!args.data.password) {
          throw new AppError('Please provide a password', 400);
        }

        // Validate password length
        if (args.data.password.length < 8) {
          throw new AppError(
            'Password must be at least 8 characters long',
            400
          );
        }
        args.data.password = await hashPassword(args.data.password);

        return query(args); // or return undefined;
      },
    },
  },
});

export default prisma;
