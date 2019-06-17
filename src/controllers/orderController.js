/* eslint-disable require-jsdoc */
import orders from '../db/orderDb';
import { validateOrderInput, validateOrderUpdate } from '../helper/validations/validateOrderInput';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';

class orderController {
  static createOrder(req, res) {
    const { errors, isValid } = validateOrderInput(req.body);
    if (!isValid) return responseMessage(res, 422, errors);
    const userId = parseInt(req.body.userId, 10);
    const carId = parseInt(req.body.carId, 10);

    const checkOrder = orders.filter(order => order.userId === userId && order.carId === carId);
    if (checkOrder.length > 0) {
      return responseMessage(res, 409, 'The order already exist');
    }
    const order = {
      id: orders.length + 1,
      userId,
      carId,
      status: 'pending',
      amount: 1200000,
      amount_offered: req.body.amountOffered,
    };
    orders.push(order);
    return retrieveCarMessage(res, 201, 'order successfully created', order);
  }

  static updateOrder(req, res) {
    const { errors, isValid } = validateOrderUpdate(req.body);
    if (!isValid) return responseMessage(res, 422, errors);

    const id = parseInt(req.params.orderId, 10);
    const userId = parseInt(req.body.userId, 10);
    const newAmount = req.body.amountOffered;

    const checkOrder = orders.filter(order => order.userId === userId && order.id === id);
    if (checkOrder < 1) {
      return responseMessage(res, 409, 'The order does not exist');
    }
    if (checkOrder[0].status === 'pending') {
      checkOrder[0].amountOffered = newAmount;
      console.log(checkOrder[0]);
      return retrieveCarMessage(res, 200, 'order successfully updated', checkOrder[0]);
    }
    return responseMessage(res, 400, 'The order has been approved');
  }
}

export default orderController;
