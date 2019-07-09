/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import DB from '../db/index';
import validate from '../helper/validations/validateInput';
import { errorMessage, retrieveCarMessage } from '../helper/validations/responseMessages';

class flagController {
  static async createFlag(req, res) {
    const { reason, car_id, description } = req.body;
    const { error } = validate.validateFlagInput(req.body);
    if (error) return errorMessage(res, 422, error.details[0].message);
    const createdOn = new Date().toLocaleDateString();

    try {
      const carExist = await DB.query('SELECT * FROM cars WHERE id=$1;', [car_id]);

      if (carExist.rowCount <= 0) return errorMessage(res, 404, 'Car not found');
      const flagAd = await DB.query('INSERT INTO flags(car_id, reason, description, createdon) VALUES($1, $2, $3, $4) RETURNING * ;', [car_id, reason, description, createdOn]);

      return retrieveCarMessage(res, 201, 'Flag created', flagAd.rows[0]);
    } catch (errors) {
      errorMessage(res, 400, 'Unable to flag car');
    }
  }
}

export default flagController;
