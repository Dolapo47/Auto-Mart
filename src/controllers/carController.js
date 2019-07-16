/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import DB from '../db/index';
import { errorMessage, retrieveCarMessage } from '../helper/validations/responseMessages';
import validate from '../helper/validations/validateInput';

class carController {
  static async createCar(req, res) {
    console.log('top', req.body);
    const { error } = validate.validateCarInput(req.body);
    if (error) {
      console.log(error);
      return errorMessage(res, 422, error.details[0].message);
    }
    const { id, email } = req.user;
    const {
      manufacturer, model, state, price, body_type, img_url,
    } = req.body;
    console.log(req.body);
    const Formatted_price = parseFloat(price).toFixed(2);
    const created_on = new Date().toLocaleString();
    const status = 'available';
    try {
      const newCar = await DB.query('INSERT INTO cars(owner_id, owner_email, created_on, state, status, price, manufacturer, model, body_type, img_url, flagged) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11) RETURNING *;', [id, email, created_on, state, status, Formatted_price, manufacturer, model, body_type, img_url, false]);
      return retrieveCarMessage(res, 201, 'Vehicle created', newCar.rows[0]);
    } catch (errors) {
      console.log(errors);
      return errorMessage(res, 400, 'Unable to create car');
    }
  }

  static async updateStatus(req, res) {
    const { error } = validate.validateUpdateStatus(req.body);
    if (error) return errorMessage(res, 422, error.details[0].message);

    const { car_id } = req.params;
    const { email } = req.user;
    const { status } = req.body;
    const regex = /^\d+$/;

    if (regex.test(car_id) === false) return errorMessage(res, 422, 'car id should be a number');

    try {
      const findCar = await DB.query('SELECT * FROM cars WHERE id=$1 AND owner_email=$2;', [car_id, email]);
      if (findCar.rowCount < 1) {
        return errorMessage(res, 404, 'no car matched the specified criteria');
      }
      if (findCar.rows[0].status === 'sold') {
        return errorMessage(res, 400, 'Car has been tagged sold');
      }
      const updateStatus = await DB.query('UPDATE cars SET status=$1 WHERE id=$2 RETURNING * ;', [status, findCar.rows[0].id]);
      return retrieveCarMessage(res, 200, 'car status updated', updateStatus.rows[0]);
    } catch (errors) {
      errorMessage(res, 400, 'Unable to update status');
    }
  }

  static async updatePrice(req, res) {
    const { error } = validate.validateUpdatePrice(req.body);
    if (error) return errorMessage(res, 422, error.details[0].message);

    const { car_id } = req.params;
    const { email } = req.user;
    const { price } = req.body;
    const Formatted_price = parseFloat(price).toFixed(2);
    const regex = /^\d+$/;
    if (regex.test(car_id) === false) return errorMessage(res, 422, 'car id should be a number');

    try {
      const findCar = await DB.query('SELECT * FROM cars WHERE id=$1 AND owner_email=$2;', [car_id, email]);
      if (findCar.rowCount < 1) {
        return errorMessage(res, 404, 'no vehicle matched the specified criteria');
      }
      const updatePrice = await DB.query('UPDATE cars SET price=$1 WHERE id=$2 RETURNING * ;', [Formatted_price, findCar.rows[0].id]);
      return retrieveCarMessage(res, 200, 'car price updated', updatePrice.rows[0]);
    } catch (errors) {
      return errorMessage(res, 400, 'Unable to update price');
    }
  }

  static async getOneCar(req, res) {
    const { car_id } = req.params;
    try {
      const getCar = await DB.query('SELECT * FROM cars WHERE id=$1;', [car_id]);
      if (getCar.rowCount === 0) return errorMessage(res, 404, 'Car not found');
      return retrieveCarMessage(res, 200, 'vehicle successfully retrieved', getCar.rows[0]);
    } catch (error) {
      return errorMessage(res, 400, 'Unable to retrieve car');
    }
  }

  static async deleteCar(req, res) {
    const { is_admin } = req.user;
    const { car_id } = req.params;
    if (is_admin !== 'true') {
      return errorMessage(res, 403, 'you are not authorized to do this');
    }
    try {
      const findCar = await DB.query('SELECT * FROM cars WHERE id=$1;', [car_id]);
      if (findCar.rowCount <= 0) {
        return errorMessage(res, 404, 'car not found');
      }
      await DB.query('DELETE FROM cars WHERE id = $1;', [car_id]);
      return retrieveCarMessage(res, 200, 'Car Ad was successfully deleted');
    } catch (error) {
      return errorMessage(res, 400, 'Unable to delete car');
    }
  }

  static async getAllCars(req, res) {
    const { is_admin } = req.user;
    if (is_admin !== 'true') {
      return errorMessage(res, 403, 'you are not authorized to do this');
    }
    try {
      const getCars = await DB.query('SELECT * FROM CARS;');
      if (getCars.rowCount <= 0) {
        return errorMessage(res, 404, 'No car found');
      }
      return retrieveCarMessage(res, 200, 'All ads successfully retrieved', getCars.rows);
    } catch (error) {
      return errorMessage(res, 400, 'Unable to retrieve cars');
    }
  }

  static async availableCars(req, res, next) {
    const { status } = req.query;

    if (status === undefined) {
      return next();
    }
    try {
      const getAvailableCars = await DB.query('SELECT * FROM cars WHERE status=$1;', ['available']);
      if (getAvailableCars.rowCount < 1) {
        return errorMessage(res, 404, 'No ad found');
      }
      return retrieveCarMessage(res, 200, 'Available cars successfully retrieved', getAvailableCars.rows);
    } catch (error) {
      return errorMessage(res, 400, 'Unable to retrieve available cars');
    }
  }

  static async filteredAvailableCar(req, res, next) {
    const { status, min_price: minPrice = 0, max_price: maxPrice = 100000000000000 } = req.query;

    if (status === undefined || (minPrice === undefined || maxPrice === undefined)) {
      return next();
    }

    const getFilteredCars = await DB.query('SELECT * FROM cars WHERE status=$1 AND (price >= $2 AND price <= $3);', ['available', minPrice, maxPrice]);
    if (getFilteredCars.rows < 1) {
      return errorMessage(res, 404, 'no car matched the specified criteria');
    } return retrieveCarMessage(res, 200, 'vehicles successfully retrieved', getFilteredCars.rows);
  }
}

export default carController;
