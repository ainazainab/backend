// src/routes/userRoutes.ts

import express from 'express';
import { getUsers } from '../controllers/userController';
import authenticateToken from '../middleware/authMiddleware';

const router = express.Router();

// GET /users - Retrieve all users (Protected route)
router.get('/users', authenticateToken, getUsers);

export default router;
