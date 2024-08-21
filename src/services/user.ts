import User from '../models/user';

class UserService {
  public async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: [
          ['id', 'id'], 
          ['display_name', 'displayName'] 
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
