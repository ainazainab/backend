// src/controllers/userController.ts

import { Request, Response } from 'express';
import UserService from '../services/user';

export const getUsers = async (req: Request, res: Response) => {
  console.log("Incoming request:", req.headers); // Log headers
  console.log("Authenticated user:", (req as any).user); // Log user info

  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error });
  }
};
