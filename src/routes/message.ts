import express from 'express';
import { getMessages } from '../controllers/message';

const router = express.Router();

// Route to fetch messages 
router.get('/', getMessages);

export default router;
