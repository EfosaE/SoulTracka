import app from "./app";
import prisma from "./utils/prismaClient";


// Set the port number for the server
const port = 3000;



async function main() {
  console.log('DB connected successfully')
}


// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});


