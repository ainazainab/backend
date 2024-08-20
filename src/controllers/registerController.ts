// src/controllers/registerController.ts

import { Request, Response } from 'express';
import RegisterService from '../services/registerService';

export const signup = async (req: Request, res: Response) => {
  const { username, email, display_name, password } = req.body;

  if (!username || !email || !display_name || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = await RegisterService.createUser({
      username,
      email,
      display_name,
      password,
    });

    // Return the created user (excluding password)
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to create user' });
  }
};
