import express from 'express';
import userController from '../controllers/userControllers';

const router = express.Router();

router.post('/auth/signup', userController.registerUser);

export default router;
