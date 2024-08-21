import express from 'express';
import { getUsers } from '../controllers/user';
import authenticateToken from '../middleware/auth';

const router = express.Router();

// GET /users - Retrieve all users (Protected route)
router.get('/', authenticateToken, getUsers);

export default router;
