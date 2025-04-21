import express from 'express';
import cors from 'cors';
import router from './routes/user';
import { PrismaClient } from '@prisma/client';
import Interviewrouter from './routes/interview';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Prisma Client
const prisma = new PrismaClient();

// CORS setup (optional, adjust the origin if needed)
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the origin as necessary

// Middleware for parsing JSON requests
app.use(express.json());

// Routes
app.use("/api", router);
app.use('/Interview', Interviewrouter);

// Error handling middleware (useful for catching unhandled errors)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server and handle cleanup
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown to disconnect Prisma Client on server shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();  // Properly disconnect Prisma client
  process.exit(0);  // Exit the process after disconnecting Prisma
});
