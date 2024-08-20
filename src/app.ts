// src/app.ts

import express from 'express';
import cors from 'cors';
import registerRoutes from './routes/registerRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';
import { authenticateToken } from './middleware'; // Import from middleware/index.ts

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api', registerRoutes); // User routes sign up 
app.use('/api', authRoutes); // Authentication routes login
app.use('/api', authenticateToken, userRoutes); // get users
app.use('/api', authenticateToken, messageRoutes);  // Use the message routes with authentication

export default app;
