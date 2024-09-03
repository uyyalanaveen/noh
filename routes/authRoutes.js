import express from 'express';
import { register, login, getusers } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getusers);

export default router;

