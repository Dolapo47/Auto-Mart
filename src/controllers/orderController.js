/* eslint-disable require-jsdoc */
import orders from '../db/orderDb';

class orderController {
  static createOrder(req, res) {
    const order = {
      id: orders.length + 1,
      userId: 2,
      carId: 1,
      status: 'pending',
      amount: 1200000,
      amount_offered: req.body.amount_offered,
    };

    orders.push(order);
    return res.status(201).json({
      status: 201,
      message: 'order successfully created',
      data: order,
    });
  }
}

export default orderController;
