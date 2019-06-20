/* eslint-disable require-jsdoc */
import pool from '../db/index';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';

/**
 *@car advert controller- controls all endpoint concerning the car adverts going to be used by users
  of this application
 */

class carController {
  static async createCar(req, res) {
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
    } catch (error) {
      responseMessage(res, 400, 'Unable to create car');
    }
  }
}

export default carController;
