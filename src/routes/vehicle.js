import express from 'express';
import Cloudinary from 'cloudinary';
import carController from '../controllers/carController';
import { verifyToken } from '../helper/userHelpers';
import { validatePostCar } from '../helper/validations/validateCarInput';

const router = express.Router();
const cloudinary = Cloudinary.v2;


router.get('/car', verifyToken, carController.filterAvailableCars);
router.get('/car', verifyToken, carController.availableCars);
router.get('/car', verifyToken, carController.getAllCars);
router.get('/car/:car_id', verifyToken, carController.getOneCar);
router.post('/car', validatePostCar, carController.createCar);
router.patch('/car/:car_id/status', verifyToken, carController.updateStatus);
router.patch('/car/:car_id/price', carController.updatePrice);
router.delete('/car/:car_id', verifyToken, carController.deleteCar);


export default router;
