// src/services/authService.ts

import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
  public async login(username: string, password: string) {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    return { token, user: { id: user.id, username: user.username, displayName: user.display_name } };
  }
}

export default new AuthService();
