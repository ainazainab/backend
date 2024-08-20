import { Request, Response } from 'express';
import AuthService from '../services/authService';

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

    // Type assertion: assert that 'error' is an instance of Error
    if (error instanceof Error) {
      if (error.message === 'Invalid credentials') {
        return res.status(400).json({ error: error.message });
      }
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
