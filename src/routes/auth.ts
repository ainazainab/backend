import express from 'express';
import { login, signup } from '../controllers/auth'; // both login and signup 

const router = express.Router();

// POST /login - Authenticate user and provide a token
router.post('/login', login);

// POST /signup - Create a new user
router.post('/signup', signup);

export default router;
