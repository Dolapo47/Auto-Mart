import express from 'express';
import flagController from '../controllers/flag';
import { verifyToken } from '../helper/userHelpers';

const router = express.Router();

router.post('/flag', verifyToken, flagController.createFlag);

export default router;
