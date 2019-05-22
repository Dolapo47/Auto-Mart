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

  static updateOrder(req, res) {
    const id = parseInt(req.params.orderId, 10);
    const amountOffered = req.body.amount_offered;
    const item = orders.filter(order => order.id === id);
    item[0].amount_offered = amountOffered;
    if (item.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No vehicle matched the specified criteria',
      });
    } if (item[0].status !== 'pending') {
      return res.status(404).json({
        status: 404,
        message: 'No vehicle matched',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Order price updated',
      data: item,
    });
  }
}

export default orderController;
