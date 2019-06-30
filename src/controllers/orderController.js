/* eslint-disable require-jsdoc */
import validate from '../helper/validations/validateInput';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';
import DB from '../db/index';

class orderController {
  static async createOrder(req, res) {
    const { error } = validate.validateOrderInput(req.body);
    if (error) return responseMessage(res, 422, error.details[0].message);
    const { id } = req.user;
    const { carId, priceOffered } = req.body;
    const price = Number(priceOffered).toFixed(2);
    const status = 'pending';
    try {
      const carExist = await DB.query('SELECT id, price FROM cars WHERE id=$1; ', [carId]);
      if (carExist.rowCount <= 0) {
        return res.status(404).send({
          status: 'error',
          error: 'Car does not exist',
        });
      }
      const createdOn = new Date().toLocaleDateString();

      const makeOrder = await DB.query('INSERT into orders(car_id, buyer_id, createdon ,amountOffered, status) VALUES($1, $2, $3, $4, $5) RETURNING * ;', [carId, id, createdOn, price, status]);
      return retrieveCarMessage(res, 201, 'order created', makeOrder.rows[0]);
    } catch (errors) {
      return responseMessage(res, 404, error.message);
    }
  }

  static async updateOrder(req, res) {
    const { error } = validate.validatePatchOrder(req.body);
    if (error) return responseMessage(res, 422, error.details[0].message);
    const { orderId } = req.params;
    const { newOffer } = req.body;
    const { id } = req.user;
    try {
      const checkUserOrder = await DB.query('SELECT * FROM orders WHERE buyer_id=$1 AND id=$2;', [id, orderId]);
      if (checkUserOrder.rowCount <= 0) {
        return responseMessage(res, 404, 'order not found');
      }
      const updateOrderPrice = await DB.query('UPDATE orders SET amountOffered=$1 WHERE id=$2 RETURNING *;', [newOffer, checkUserOrder.rows[0].id]);
      return retrieveCarMessage(res, 200, 'success', updateOrderPrice.rows[0]);
    } catch (errors) {
      return res.status(400).send({
        status: 'error',
        error: error.message,
      });
    }
  }
}

export default orderController;
