import { Router } from 'express';
import authRoutes from './auth'; 
import messageRoutes from './message'; 
import userRoutes from './user'; 
import authenticateToken from '../middleware/auth'; // Import the authentication middleware

const router = Router();

// Define routes with their respective paths
router.use('/auth', authRoutes); // Authentication routes, including login and signup
router.use('/users', authenticateToken, userRoutes); // Protected user routes
router.use('/messages', authenticateToken, messageRoutes); // Protected message routes

export default router;
