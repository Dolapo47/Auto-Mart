import express from 'express';
import carController from '../controllers/carController';

const router = express.Router();

router.get('/car', carController.getAllCars);
router.get('/car/:car_id', carController.getOneCar);
router.post('/car', carController.createCar);
router.patch('/car/:car_id', carController.updateStatus);
router.patch('/car/:car_id', carController.updatePrice);
router.delete('/car/:car_id', carController.deleteCar);
router.get('/car?status=availabl', carController.getAvailableCars);


export default router;
