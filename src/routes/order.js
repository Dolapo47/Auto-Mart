import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.post('/order', orderController.createOrder);


export default router;
