// src/routes/messageRoutes.ts
import express from 'express';
import { Op } from 'sequelize'; 
import Message from '../models/message';

const router = express.Router();

// Route to fetch messages with senderId and receiverId as query parameters
router.get('/messages', async (req, res) => {
  try {
    const senderId = parseInt(req.query.senderId as string, 10);
    const receiverId = parseInt(req.query.receiverId as string, 10);

    // Validate senderId and receiverId
    if (isNaN(senderId) || isNaN(receiverId)) {
      return res.status(400).json({ error: 'Invalid senderId or receiverId' });
    }

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

    // Return the messages as JSON
    res.json(messages);
  } catch (error) {
    // Handle any errors during the fetch operation
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;
