import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { initializeDatabase } from './config/sequelize'; // Import the Sequelize instance and initializeDatabase function
import { socketHandler } from './socket/socket'; // Import socketHandler
import indexRoute from './routes'; // Import the main index route

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Define the main index route with the base path `/api/v1`
app.use('/api/v1', indexRoute);

// Create HTTP server and Socket.io instance
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

// Handle socket connections
socketHandler(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Authenticate and sync Sequelize models with the database
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the process if the database fails to initialize
  }
});

export { io, server };
