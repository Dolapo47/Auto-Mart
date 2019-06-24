/* eslint-disable require-jsdoc */
import { validateOrderInput, validateOrderUpdate } from '../helper/validations/validateOrderInput';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';
import pool from '../db';

class orderController {
  static async createOrder(req, res) {
    const { errors, isValid } = validateOrderInput(req.body);
    if (!isValid) return responseMessage(res, 400, errors);
    const { id } = req.user;
    const { carId, priceOffered } = req.body;
    const price = Number(priceOffered).toFixed(2);
    const status = 'pending';
    try {
      const carExist = await pool.query('SELECT id, price FROM cars WHERE id=$1; ', [carId]);
      if (carExist.rowCount <= 0) {
        return res.status(404).send({
          status: 'error',
          error: 'Car does not exist',
        });
      }
      const createdOn = new Date().toLocaleDateString();

      const makeOrder = await pool.query('INSERT into orders(car_id, buyer_id, createdon ,amountOffered, status) VALUES($1, $2, $3, $4, $5) RETURNING * ;', [carId, id, createdOn, price, status]);
      return retrieveCarMessage(res, 201, 'order created', makeOrder.rows[0]);
    } catch (error) {
      return responseMessage(res, 404, error.message);
    }
  }

  static async updateOrder(req, res) {
    const { errors, isValid } = validateOrderUpdate(req.body);
    if (!isValid) return responseMessage(res, 400, errors);
    const { orderId } = req.params;
    const { newOffer } = req.body;
    const { id } = req.user;
    try {
      const checkUserOrder = await pool.query('SELECT * FROM orders WHERE buyer_id=$1 AND id=$2;', [id, orderId]);
      if (checkUserOrder.rowCount <= 0) {
        return responseMessage(res, 404, 'order not found');
      }
      const updateOrderPrice = await pool.query('UPDATE orders SET amountoffered=$1 WHERE id=$2 RETURNING *;', [newOffer, checkUserOrder.rows[0].id]);
      return retrieveCarMessage(res, 200, 'success', updateOrderPrice.rows);
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        error: error.message,
      });
    }
  }
}

export default orderController;
