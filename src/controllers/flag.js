/* eslint-disable require-jsdoc */
import pool from '../db/index';
import validateFlagInput from '../helper/validations/validateFlagInput';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';

class flagController {
  static async createFlag(req, res) {
    const { reason, carId, description } = req.body;
    const { errors, isValid } = validateFlagInput(req.body);
    if (!isValid) return responseMessage(res, 400, errors);
    const createdOn = new Date().toLocaleDateString();

    try {
      const carExist = await pool.query('SELECT * FROM cars WHERE id=$1;', [carId]);

      if (carExist.rowCount <= 0) return res.status(404).send({ status: 'error', error: 'Car not found' });
      const flagAd = await pool.query('INSERT INTO flags(car_id, reason, description, createdon) VALUES($1, $2, $3, $4) RETURNING * ;', [carId, reason, description, createdOn]);

      return retrieveCarMessage(res, 201, 'Flag created', flagAd.rows[0]);
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        error: error.message,
      });
    }
  }
}

export default flagController;
