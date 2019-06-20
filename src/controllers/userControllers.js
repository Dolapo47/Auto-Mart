/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/index';
import validateRegisterInput from '../helper/validations/validateRegeisterInput';
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
}

export default userController;
