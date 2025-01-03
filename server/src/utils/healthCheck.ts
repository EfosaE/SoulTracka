import prisma from './prismaClient';

export const checkDatabaseHealth = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`; // Query to check DB connection
    return { healthy: true };
  } catch (error) {
    console.error('Database health check failed:', error);
    return { healthy: false, reason: 'Database not running...' };
  }
};
