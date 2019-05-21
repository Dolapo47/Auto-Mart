import express from 'express';
import carController from '../controllers/carController';

const router = express.Router();

router.post('/car', carController.createCar);

export default router;
