// src/routes/messageRoutes.ts

import express from 'express';
import { getMessages } from '../controllers/message';

const router = express.Router();

// Route to fetch messages with senderId and receiverId as query parameters
router.get('/', getMessages);

export default router;
