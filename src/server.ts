import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/sequelize'; 
import { socketHandler } from './socket/socket'; 
import indexRoute from './routes'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', indexRoute);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

socketHandler(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await initializeDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit if the database fails to initialize
  }
});

export { io, server };
