/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import validate from '../helper/validations/validateInput';
import { errorMessage, retrieveCarMessage } from '../helper/validations/responseMessages';
import DB from '../db/index';

class orderController {
  static async createOrder(req, res) {
    const { error } = validate.validateOrderInput(req.body);
    if (error) return errorMessage(res, 422, error.details[0].message);
    const { id } = req.user;
    const { car_id, price_offered } = req.body;
    const price = Number(price_offered).toFixed(2);
    const status = 'pending';
    try {
      const carExist = await DB.query('SELECT id, price FROM cars WHERE id=$1; ', [car_id]);
      if (carExist.rowCount <= 0) {
        return errorMessage(res, 404, 'Car does not exist');
      }
      const created_On = new Date().toLocaleDateString();

      const makeOrder = await DB.query('INSERT into orders(car_id, buyer_id, created_on ,amount_offered, status) VALUES($1, $2, $3, $4, $5) RETURNING * ;', [car_id, id, created_On, price, status]);
      return retrieveCarMessage(res, 201, 'order created', makeOrder.rows[0]);
    } catch (errors) {
      return errorMessage(res, 400, 'unable to create order');
    }
  }

  static async updateOrder(req, res) {
    const { error } = validate.validatePatchOrder(req.body);
    if (error) return errorMessage(res, 422, error.details[0].message);
    const { order_id } = req.params;
    const { new_offer } = req.body;
    const { id } = req.user;
    try {
      const checkUserOrder = await DB.query('SELECT * FROM orders WHERE buyer_id=$1 AND id=$2;', [id, order_id]);
      if (checkUserOrder.rowCount <= 0) {
        return errorMessage(res, 404, 'order not found');
      }
      const updateOrderPrice = await DB.query('UPDATE orders SET amount_offered=$1 WHERE id=$2 RETURNING *;', [new_offer, checkUserOrder.rows[0].id]);
      return retrieveCarMessage(res, 200, 'success', updateOrderPrice.rows[0]);
    } catch (errors) {
      return errorMessage(res, 400, 'unable to update order');
    }
  }
}

export default orderController;
