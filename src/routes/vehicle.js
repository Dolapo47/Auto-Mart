import express from 'express';
import carController from '../controllers/carController';

const router = express.Router();

router.post('/car', carController.createCar);
router.get('/car', carController.getAllCars);
router.get('/car/:car_id', carController.getOneCar);
router.patch('/car/:car_id', carController.updateStatus);
router.delete('/car/:car_id', carController.deleteCar);

export default router;
