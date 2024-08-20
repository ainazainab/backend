// src/services/registerService.ts

import User from '../models/user';
import bcrypt from 'bcrypt';

interface CreateUserInput {
  username: string;
  email: string;
  display_name: string;
  password: string;
}

class RegisterService {
  public async createUser({ username, email, display_name, password }: CreateUserInput) {
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

      return newUser.toJSON();
    } catch (error) {
      console.error('Error in RegisterService:', error);
      throw new Error('Failed to create user');
    }
  }
}

export default new RegisterService();
