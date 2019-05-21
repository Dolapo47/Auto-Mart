import express from 'express';
import carController from '../controllers/carController';

const router = express.Router();

router.post('/car', carController.createCar);
router.get('/car', carController.getAllCars);
router.get('/car/:car_id', carController.getOneCar);

export default router;
