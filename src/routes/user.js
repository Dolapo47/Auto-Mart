import express from 'express';
import userController from '../controllers/userControllers';

const router = express.Router();

router.post('/auth/signup', userController.registerUser);
router.post('/auth/signin', userController.loginUser);

export default router;