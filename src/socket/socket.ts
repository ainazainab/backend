import { Server, Socket } from 'socket.io';
import Message from '../models/message';

const connectedUsers: { [key: string]: Socket } = {};

export const socketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.userId as string; // Extract userId from query

    if (userId) {
      console.log('User connected:', userId);
      connectedUsers[userId] = socket;
      io.emit('users', Object.keys(connectedUsers)); // Broadcast updated user list
      console.log('Active users emitted:', Object.keys(connectedUsers));
    }

    socket.on('send_message', async (message) => {
      const [sender, receiver, text, createdAt] = JSON.parse(message); // Include createdAt

      try {
        // Emit the message to the receiver with the timestamp
        const receiverSocket = connectedUsers[receiver];
        if (receiverSocket) {
          receiverSocket.emit('message', { sender, text, createdAt }); // Include createdAt when emitting the message
        }
        
        // Save the message to the database with the timestamp
        await Message.create({
          senderId: parseInt(sender, 10),
          receiverId: parseInt(receiver, 10),
          text: text,
          //createdAt: new Date(createdAt), // Ensure this is stored correctly
        });
        console.log('Message saved:', { sender, receiver, text, createdAt });
        
      } catch (error) {
        console.error('Error saving message:', error);
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
};
