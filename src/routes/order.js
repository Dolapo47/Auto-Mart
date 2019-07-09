import express from 'express';
import orderController from '../controllers/orderController';
import { verifyToken } from '../helper/userHelpers';
import trim from '../helper/trimmer/trimmer';

const { orderTrim, updateOrderTrim } = trim;

const router = express.Router();

router.post('/order', verifyToken, orderTrim, orderController.createOrder);
router.patch('/order/:order_id/price', verifyToken, updateOrderTrim, orderController.updateOrder);


export default router;
