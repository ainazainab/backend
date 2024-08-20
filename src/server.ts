import { createServer } from 'http';
import { Server } from 'socket.io';
import { sequelize } from './models';
import app from './app'; // Import the Express app
import { socketHandler } from './socket/socket'; // Import socketHandler
import { config } from './config'; // Import configuration

// Create HTTP server and Socket.io instance
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Consider specifying origins
    methods: ['GET', 'POST'],
  },
});

// Use the socketHandler to handle socket connections
socketHandler(io);

const PORT = config.port;

// Authenticate and sync Sequelize models with the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync(); // Sync models with the database
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export { io, server };
