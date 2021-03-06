import express from 'express';
import carController from '../controllers/carController';
import { verifyToken } from '../helper/userHelpers';

const router = express.Router();


router.get('/car', verifyToken, carController.filteredAvailableCar);
router.get('/car', verifyToken, carController.availableCars);
router.get('/car', verifyToken, carController.getAllCars);
router.get('/car/:car_id', verifyToken, carController.getOneCar);
router.post('/car', verifyToken, carController.createCar);
router.patch('/car/:car_id/status', verifyToken, carController.updateStatus);
router.patch('/car/:car_id/price', verifyToken, carController.updatePrice);
router.delete('/car/:car_id', verifyToken, carController.deleteCar);


export default router;
