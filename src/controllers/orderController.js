/* eslint-disable require-jsdoc */
import { validateOrderInput, validateOrderUpdate } from '../helper/validations/validateOrderInput';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';
import pool from '../db';

class orderController {
  static async createOrder(req, res) {
    const { errors, isValid } = validateOrderInput(req.body);
    if (!isValid) return responseMessage(res, 422, errors);
    const { id } = req.user;
    const carId = parseInt(req.body.carId, 10);
    const { priceOffered } = req.body;
    const price = Number(priceOffered).toFixed(2);
    const status = 'pending';
    try {
      const checkOrder = await pool.query('SELECT * FROM orders WHERE (car_id = $1 AND buyer_id = $2) OR status = $3;', [carId, id, 'pending']);
      if (checkOrder.rowCount > 0) {
        return responseMessage(res, 409, 'The order already exist');
      }
      const createdOn = new Date().toLocaleDateString();
      const makeOrder = await pool.query('INSERT into orders(car_id, buyer_id, createdon ,amountOffered, status) VALUES($1, $2, $3, $4, $5) RETURNING * ;', [carId, id, createdOn, price, status]);
      return res.status(201).send({
        status: 'success',
        data: {
          id: makeOrder.rows[0].id,
          buyerId: makeOrder.rows[0].buyer_id,
          carId,
          createdOn: makeOrder.rows[0].createdon,
          priceOffered: makeOrder.rows[0].amountoffered,
          status: makeOrder.rows[0].status,
        },
      });
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        error: error.message,
      });
    }
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
      return retrieveCarMessage(res, 200, 'order successfully updated', checkOrder[0]);
    }
    return responseMessage(res, 400, 'The order has been approved');
  }
}

export default orderController;
