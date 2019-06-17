/* eslint-disable require-jsdoc */
import orders from '../db/orderDb';
import validateOrderInput from '../helper/validations/validateOrderInput';
import { responseMessage } from '../helper/validations/responseMessages';

class orderController {
  static createOrder(req, res) {
    const { errors, isValid } = validateOrderInput(req.body);
    if (!isValid) return responseMessage(res, 422, errors);
    const userId = parseInt(req.body.userId, 10);
    const carId = parseInt(req.body.carId, 10);

    const checkOrder = orders.filter(order => order.userId === userId && order.carId === carId);
    if (checkOrder.length > 0) {
      res.status(409).json({
        status: 409,
        message: 'The order already exist',
      });
    } else {
      const order = {
        id: orders.length + 1,
        userId,
        carId,
        status: 'pending',
        amount: 1200000,
        amount_offered: req.body.amountOffered,
      };

      orders.push(order);
      return res.status(201).json({
        status: 201,
        message: 'order successfully created',
        data: order,
      });
    }
  }
}

export default orderController;
