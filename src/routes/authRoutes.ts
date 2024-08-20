// src/routes/authRoutes.ts

import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

// POST /login - Authenticate user and provide a token
router.post('/login', login);

export default router;
