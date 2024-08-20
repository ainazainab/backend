import { Request, Response } from 'express';
import AuthService from '../services/auth';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const { token, user } = await AuthService.login(username, password);
    res.json({ token, user });
  } catch (error) {
    console.error('Error logging in:', error);

    if (error instanceof Error && error.message === 'Invalid credentials') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, display_name, password } = req.body;

  if (!username || !email || !display_name || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = await AuthService.createUser({
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
    res.status(500).json({ error: 'Failed to create user' });
  }
};
