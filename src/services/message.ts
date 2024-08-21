import { Op } from 'sequelize';
import Message from '../models/message';

class MessageService {
  public async getMessages(senderId: number, receiverId: number) {
    // Fetch messages where senderId and receiverId match either direction
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
      order: [['createdAt', 'ASC']], // Order messages by creation date
    });

    return messages;
  }
}

export default new MessageService();
