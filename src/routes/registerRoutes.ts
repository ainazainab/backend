import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import authenticateToken from '../middleware/authMiddleware';
import { io } from '../server';


const router = express.Router();


// POST /signup - Create a new user
router.post('/signup', async (req: Request, res: Response) => {
  const { username, email, display_name, password } = req.body;

  if (!username || !email || !display_name || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      display_name,
      password: hashedPassword,
    });

    // Return the created user (excluding password)
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default router;

