import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as dotenv from 'dotenv';
import { sequelize } from './models'; 
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { Socket } from 'socket.io';
import authenticateToken from './middleware/authMiddleware';
import registerRoutes from './routes/registerRoutes';

// Initialize environment variables
dotenv.config();

const app = express();
const cors = require('cors');
app.use(cors());

// Create HTTP server and Socket.io instance
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Define routes
app.use(express.json());
app.use('/api', registerRoutes); // User routes sign up 
app.use('/api', authRoutes); // Authentication routes login
app.use('/api', authenticateToken, userRoutes); //get users



// Dictionary to keep track of connected users
const connectedUsers: { [key: string]: Socket } = {};

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId as string; // Extract userId from query
  const username = socket.handshake.query.displayName;

  if (userId) {
    console.log('User connected:', userId, username);
    connectedUsers[userId] = socket;
    io.emit('users', Object.keys(connectedUsers)); // Broadcast updated user list
  }

  socket.on('send_message', async (message) => {
    const [sender, receiver, text] = JSON.parse(message);
    console.log('Message received:', { sender, receiver, text });

    const receiverSocket = connectedUsers[receiver];
    if (receiverSocket) {
      receiverSocket.emit('message', `${sender} sent: ${text}`);
    }
  });

  socket.on('disconnect', () => {
    const userId = Object.keys(connectedUsers).find(key => connectedUsers[key].id === socket.id);
    if (userId) {
      delete connectedUsers[userId];
      io.emit('users', Object.keys(connectedUsers)); // Broadcast updated user list
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

// Authenticate and sync Sequelize models with the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync(); // Sync models with database
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });

export { io, server };
