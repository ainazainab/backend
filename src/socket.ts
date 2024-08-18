import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import { sequelize } from './models/index'; 
import Message from './models/message';

// Initialize Express app
const app = express();

// Create an HTTP server and initialize Socket.io with it
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for simplicity; adjust as needed
    methods: ['GET', 'POST']
  }
});

// Middleware to parse JSON requests
app.use(express.json());

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle user joining a room
  socket.on('join', async (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
    
    // Optionally, you could fetch user data and emit it if needed
    // const user = await User.findByPk(userId);
    // socket.emit('user_data', user);
  });

  // Handle sending a message
  socket.on('send_message', async (message) => {
    const { senderId, receiverId, text } = message;
    try {
      // Save message to the database
      // await Message.create({ senderId, receiverId, text });

      // Emit the message to the receiver and sender
      io.to(receiverId).emit('receive_message', message);
      io.to(senderId).emit('receive_message', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Export the server and Socket.io instance
export { io, server };
