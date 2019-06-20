/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/index';
import validateRegisterInput from '../helper/validations/validateRegeisterInput';
import validateLogin from '../helper/validations/validateLogin';
import { responseMessage } from '../helper/validations/responseMessages';

/**
 @class usercontroller- authorizes and authenticates users of this application
 */

class userController {
  /**
  * @handles registration of new users to the application
 */

  static async signupUser(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) return responseMessage(res, 400, errors);
    const {
      firstname, lastname, email, password, address, adminSecret,
    } = req.body;
    const isAdmin = adminSecret === process.env.ADMIN_SECRET ? 't' : 'f';

    try {
      /**
    * Check if the email used exist
    */

      const existingUser = await pool.query('SELECT * from users WHERE email=$1;', [email]);
      if (existingUser.rowCount) {
        return res.status(409).send({
          status: 409,
          error: 'User exist already',
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const registerUser = await pool.query('INSERT INTO users(firstname, lastname, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [firstname, lastname, email, hashedPassword, address, isAdmin]);

      return jwt.sign(registerUser.rows[0], process.env.SECRET, (err, token) => {
        if (err) res.status(400).send({ error: err.message });
        res.status(201).send({
          status: 201,
          data: {
            token,
            id: registerUser.rows[0].id,
            firstname: registerUser.rows[0].firstname,
            lastname: registerUser.rows[0].lastname,
            email: registerUser.rows[0].email,
            address: registerUser.rows[0].address,
          },
        });
      });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  /**
   * @controller - handles the loggin in of registered user
   * It will not log an unregistered user in
   * It will not login on wrong password credentials
   */

  static async loginUser(req, res) {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) return responseMessage(res, 400, errors);

    const { email, password } = req.body;

    try {
      const userExist = await pool.query('SELECT * FROM users WHERE email=$1;', [email]);
      if (userExist.rowCount <= 0) {
        responseMessage(res, 404, 'User does not exist!');
      }

      const comparePasswords = bcrypt.compareSync(password, userExist.rows[0].password);
      if (!comparePasswords) {
        responseMessage(res, 401, 'Email or password is incorrect!');
      }

      return jwt.sign(userExist.rows[0], process.env.SECRET, (err, token) => {
        if (err) responseMessage(res, 401, 'Auth Failed');
        res.status(200).send({
          status: 'success',
          data: {
            token,
            id: userExist.rows[0].id,
            email: userExist.rows[0].email,
            lastname: userExist.rows[0].lastname,
            firstname: userExist.rows[0].firstname,
            adminStatus: userExist.rows[0].is_admin,
          },
        });
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
}

export default userController;
