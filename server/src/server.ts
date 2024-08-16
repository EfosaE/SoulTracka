import app from './app';
import prisma from './utils/prismaClient';

// The port number for the server
const port = 3000;

async function main() {
  try {
    // Test the database connection
    await prisma.$connect();
    console.log('DB connected successfully');
  } catch (error) {
    console.error('Failed to connect to the database', error);
    await prisma.$disconnect();
    process.exit(1);
  }

}

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
  main()
    .then(async () => {
      // Any additional startup logic here if needed
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});
