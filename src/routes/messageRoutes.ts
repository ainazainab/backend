// src/routes/messageRoutes.ts
import express from 'express';
import { Op } from 'sequelize'; 
import Message from '../models/message';

const router = express.Router();

router.post('/messages', async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
   // const message = await Message.create({ senderId, receiverId, text });
   // res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

router.get('/messages/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;
