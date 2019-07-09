import express from 'express';
import flagController from '../controllers/flag';
import { verifyToken } from '../helper/userHelpers';
import trim from '../helper/trimmer/trimmer';

const { flagTrim } = trim;

const router = express.Router();

router.post('/flag', verifyToken, flagTrim, flagController.createFlag);

export default router;
