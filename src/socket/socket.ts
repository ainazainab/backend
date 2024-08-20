import { Server, Socket } from 'socket.io';
import Message from '../models/message';

const connectedUsers: { [key: string]: Socket } = {};

export const socketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.userId as string; // Extract userId from query
    const username = socket.handshake.query.displayName as string;

    if (userId) {
      console.log('User connected:', userId);
      connectedUsers[userId] = socket;
      io.emit('users', Object.keys(connectedUsers)); // Broadcast updated user list
      console.log('Active users emitted:', Object.keys(connectedUsers));
    }

    socket.on('send_message', async (message) => {
      const [sender, receiver, text] = JSON.parse(message);

      try {
        console.log('Message saved:', { sender, receiver, text });

        // Emit the message to the receiver
        const receiverSocket = connectedUsers[receiver];
        if (receiverSocket) {
          receiverSocket.emit('message', { sender, text });
        }

        // Save the message to the database
        await Message.create({
          senderId: parseInt(sender, 10),
          receiverId: parseInt(receiver, 10),
          text: text,
        });

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
