import express from 'express';
import orderController from '../controllers/orderController';
import { verifyToken } from '../helper/userHelpers';

const router = express.Router();

router.post('/order', verifyToken, orderController.createOrder);
// router.patch('/order/:orderId/price', orderController.updateOrder);


export default router;
