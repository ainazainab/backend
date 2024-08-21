import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateUserInput } from '../interfaces/ICreateUser';

class AuthService {
  // Method to handle user login
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

  // Method to handle user registration (previously in RegisterService)
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
      console.error('Error in AuthService - createUser:', error);
      throw new Error('Failed to create user');
    }
  }
}

export default new AuthService();
