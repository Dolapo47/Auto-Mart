import express from 'express';
import carController from '../controllers/carController';
import { verifyToken } from '../helper/userHelpers';
import upload from '../helper/multer';
import cloudinaryuploader from '../helper/cloudinary';

const router = express.Router();


// router.get('/car', verifyToken, carController.filterAvailableCars);
// router.get('/car', verifyToken, carController.availableCars);
// router.get('/car', verifyToken, carController.getAllCars);
router.get('/car/:carId', verifyToken, carController.getOneCar);
router.post('/car', verifyToken, upload.array('image_url', 2), cloudinaryuploader, carController.createCar);
router.patch('/car/:carId/status', verifyToken, carController.updateStatus);
router.patch('/car/:carId/price', verifyToken, carController.updatePrice);
// router.delete('/car/:car_id', verifyToken, carController.deleteCar);


export default router;
