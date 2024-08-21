import { Router } from 'express';
import authRoutes from './auth'; 
import messageRoutes from './message'; 
import userRoutes from './user'; 
import authenticateToken from '../middleware/auth'; 

const router = Router();

router.use('/auth', authRoutes); // Authentication routes, including login and signup
router.use('/users', authenticateToken, userRoutes); // Protected user routes
router.use('/messages', authenticateToken, messageRoutes); // Protected message routes

export default router;
