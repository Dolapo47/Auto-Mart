import express from 'express';
import carController from '../controllers/carController';
import { verifyToken } from '../helper/userHelpers';
import upload from '../helper/multer';
import cloudinaryuploader from '../helper/cloudinary';
import trim from '../helper/trimmer/trimmer';
import  validate from '../helper/validations/validateInput';

const { carTrim, carPriceTrim, carStatusTrim } = trim;

const router = express.Router();


router.get('/car', verifyToken, carController.filteredAvailableCar);
router.get('/car', verifyToken, carController.availableCars);
router.get('/car', verifyToken, carController.getAllCars);
router.get('/car/:car_id', verifyToken, carController.getOneCar);
router.post('/car', verifyToken, carTrim, carController.createCar);
router.patch('/car/:car_id/status', verifyToken, carStatusTrim, carController.updateStatus);
router.patch('/car/:car_id/price', verifyToken, carPriceTrim, carController.updatePrice);
router.delete('/car/:car_id', verifyToken, carController.deleteCar);


export default router;
