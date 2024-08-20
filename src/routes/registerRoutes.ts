// src/routes/registerRoutes.ts

import express from 'express';
import { signup } from '../controllers/registerController';

const router = express.Router();

// POST /signup - Create a new user
router.post('/signup', signup);

export default router;
