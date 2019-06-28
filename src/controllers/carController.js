/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import pool from '../db/index';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';
import validate from '../helper/validations/validateInput';

class carController {
  static async createCar(req, res) {
    const { error } = validate.validateCarInput(req.body);
    if (error) return responseMessage(res, 422, error.details[0].message);
    const { id, email } = req.user;
    const {
      manufacturer, model, state, price, bodyType, imageUrl,
    } = req.body;
    const Formattedprice = parseFloat(price).toFixed(2);
    const createdOn = new Date().toLocaleString();
    const status = 'available';
    try {
      const newCar = await pool.query('INSERT INTO cars(ownerId, ownerEmail, createdon, state, status, price, manufacturer, model, body_type, image_url, flagged) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11) RETURNING *;', [id, email, createdOn, state, status, Formattedprice, manufacturer, model, bodyType, imageUrl, false]);
      retrieveCarMessage(res, 201, 'Vehicle created', newCar.rows[0]);
    } catch (errors) {
      responseMessage(res, 400, 'Unable to create car');
    }
  }

  static async updateStatus(req, res) {
    const { error } = validate.validateUpdateStatus(req.body);
    if (error) return responseMessage(res, 422, error.details[0].message);

    const { carId } = req.params;
    const { email } = req.user;
    const { status } = req.body;

    try {
      const findCar = await pool.query('SELECT * FROM cars WHERE id=$1 AND ownerEmail=$2;', [carId, email]);
      if (findCar.rowCount < 1) {
        return responseMessage(res, 400, 'Unable to update car');
      }
      if (findCar.rows[0].status === 'sold') {
        return responseMessage(res, 400, 'Car has been tagged sold');
      }
      const updateStatus = await pool.query('UPDATE cars SET status=$1 WHERE id=$2 RETURNING * ;', [status, findCar.rows[0].id]);
      return retrieveCarMessage(res, 200, 'car status updated', updateStatus.rows[0]);
    } catch (errors) {
      return res.status(500).send({
        status: 'error',
        error: 'internal server error',
      });
    }
  }

  static async updatePrice(req, res) {
    const { error } = validate.validateUpdatePrice(req.body);
    if (error) return responseMessage(res, 422, error.details[0].message);

    const { carId } = req.params;
    const { email } = req.user;
    const { price } = req.body;
    const Formattedprice = parseFloat(price).toFixed(2);

    try {
      const findCar = await pool.query('SELECT * FROM cars WHERE id=$1 AND ownerEmail=$2;', [carId, email]);
      if (findCar.rowCount < 1) {
        return responseMessage(res, 400, 'Unable to update car');
      }
      const updatePrice = await pool.query('UPDATE cars SET price=$1 WHERE id=$2 RETURNING * ;', [Formattedprice, findCar.rows[0].id]);
      return retrieveCarMessage(res, 200, 'car price updated', updatePrice.rows[0]);
    } catch (errors) {
      return res.status(500).send({
        status: 'error',
        error: 'internal server error',
      });
    }
  }

  static async getOneCar(req, res) {
    const { carId } = req.params;

    try {
      const getCar = await pool.query('SELECT * FROM cars WHERE id=$1;', [carId]);
      if (getCar.rowCount <= 0) return responseMessage(res, 404, 'Car not found');
      return retrieveCarMessage(res, 200, 'vehicle successfully retrieved', getCar.rows[0]);
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error: 'internal server error',
      });
    }
  }

  static async deleteCar(req, res) {
    const { is_admin } = req.user;
    const { carId } = req.params;
    if (is_admin !== 't') {
      return responseMessage(res, 403, 'you are not authorized to do this');
    }
    try {
      const findCar = await pool.query('SELECT * FROM cars WHERE id=$1;', [carId]);
      if (findCar.rowCount <= 0) {
        return responseMessage(res, 404, 'Ad not found');
      }
      await pool.query('DELETE FROM cars WHERE id = $1;', [carId]);
      return retrieveCarMessage(res, 200, 'Car Ad was successfully deleted');
    } catch (error) {
      res.status(500).send({
        status: 'error',
        error: 'internal server error',
      });
    }
  }

  static async getAllCars(req, res) {
    const { is_admin } = req.user;
    if (is_admin !== 't') {
      return responseMessage(res, 403, 'you are not authorized to do this');
    }
    try {
      const getCars = await pool.query('SELECT * FROM CARS ;');
      if (getCars.rowCount <= 0) {
        return responseMessage(res, 404, 'No ad found');
      }
      return retrieveCarMessage(res, 200, 'All ads successfully retrieved', getCars.rows);
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        error: error.message,
      });
    }
  }

  static async availableCars(req, res, next) {
    const { status } = req.query;

    if (status === undefined) {
      return next();
    }
    const getAvailableCars = await pool.query('SELECT * FROM cars WHERE status=$1;', ['available']);
    if (getAvailableCars.rowCount < 1) {
      return responseMessage(res, 404, 'No ad found');
    }
    retrieveCarMessage(res, 200, 'Available cars successfully retrieved', getAvailableCars.rows);
  }

  static async filteredAvailableCar(req, res, next) {
    const { status, min_price: minPrice = 0, max_price: maxPrice = 100000000000000 } = req.query;

    if (status === undefined || (minPrice === undefined || maxPrice === undefined)) {
      return next();
    }

    const getFilteredCars = await pool.query('SELECT * FROM cars WHERE status=$1 AND (price >= $2 AND price <= $3);', ['available', minPrice, maxPrice]);
    if (getFilteredCars.rows < 1) {
      return responseMessage(res, 404, 'no car matched the specified criteria');
    } return retrieveCarMessage(res, 200, 'vehicles successfully retrieved', getFilteredCars.rows);
  }
}

export default carController;
