// src/routes/messageRoutes.ts

import express from 'express';
import { getMessages } from '../controllers/messageController';

const router = express.Router();

// Route to fetch messages with senderId and receiverId as query parameters
router.get('/messages', getMessages);

export default router;
