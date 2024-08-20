import express from 'express';
import { login, signup } from '../controllers/auth'; // Import both login and signup from the auth controller

const router = express.Router();

// POST /login - Authenticate user and provide a token
router.post('/login', login);

// POST /signup - Create a new user
router.post('/signup', signup);

export default router;
