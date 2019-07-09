/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import DB from '../db/index';
import validate from '../helper/validations/validateInput';
import { errorMessage, userMessage, } from '../helper/validations/responseMessages';


class userController {
  static async signupUser(req, res) {
    const { error } = validate.validateUser(req.body);
    if (error) return errorMessage(res, 422, error.details[0].message);
    const {
      first_name, last_name, email, password, address,
    } = req.body;
    try {
      const existingUser = await DB.query('SELECT * from users WHERE email=$1;', [email]);
      if (existingUser.rowCount) {
        return errorMessage(res, 409, 'User exists already');
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const registerUser = await DB.query('INSERT INTO users(firstname, lastname, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [first_name, last_name, email, hashedPassword, address, 'f']);
      return jwt.sign(registerUser.rows[0], process.env.SECRET, (err, token) => {
        if (err) errorMessage(res, 400, 'unable to register new user');
        userMessage(res, 201, 'user created', token, registerUser.rows[0]);
      });
    } catch (errors) {
      return errorMessage(res, 400, 'unable to register new user');
    }
  }


  static async loginUser(req, res) {
    const { error } = validate.validateLogin(req.body);
    if (error) return errorMessage(res, 422, error.details[0].message);

    const { email, password } = req.body;

    try {
      const userExist = await DB.query('SELECT * FROM users WHERE email=$1;', [email]);
      if (userExist.rowCount === 0) {
        errorMessage(res, 404, 'User does not exist!');
      }

      const comparePasswords = bcrypt.compareSync(password, userExist.rows[0].password);
      if (!comparePasswords) {
        errorMessage(res, 401, 'Email or password is incorrect!');
      }

      return jwt.sign(userExist.rows[0], process.env.SECRET, (err, token) => {
        if (err) errorMessage(res, 401, 'Auth Failed');
        userMessage(res, 200, 'Auth Successful', token, userExist.rows[0]);
      });
    } catch (errors) {
      errorMessage(res, 400, 'Auth Failed');
    }
  }
}

export default userController;
