// src/services/userService.ts

import User from '../models/user';

class UserService {
  public async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: [
          ['id', 'id'], // Alias id as id
          ['display_name', 'displayName'] // Alias display_name as displayName
        ]
      });
      return users;
    } catch (error) {
      console.error('Error in UserService:', error);
      throw new Error('Failed to fetch users');
    }
  }
}

export default new UserService();
