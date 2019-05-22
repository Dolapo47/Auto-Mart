import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.post('/order', orderController.createOrder);
router.patch('/order/:orderId/price', orderController.updateOrder);


export default router;
