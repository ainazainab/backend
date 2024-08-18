
import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import authenticateToken from '../middleware/authMiddleware';
import { io } from '../server';


const router = express.Router();

// GET /users - Retrieve all users (Protected route)
router.get('/users', async (req, res) => {
    console.log("Incoming request:", req.headers); // Log headers
    console.log("Authenticated user:", (req as any).user); // Log user info
  
    try {
      const users = await User.findAll({
        attributes: [
          ['id', 'id'], // Alias id as id
          ['display_name', 'displayName'] // Alias display_name as displayName
        ] 
      });
     // console.log("Returning users:", users);
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  


  export default router;  