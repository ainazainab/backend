import { Request, Response } from 'express';
import MessageService from '../services/message';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const senderId = parseInt(req.query.senderId as string, 10);
    const receiverId = parseInt(req.query.receiverId as string, 10);

    // Validate senderId and receiverId
    if (isNaN(senderId) || isNaN(receiverId)) {
      return res.status(400).json({ error: 'Invalid senderId or receiverId' });
    }

    const messages = await MessageService.getMessages(senderId, receiverId);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error });
  }
};
