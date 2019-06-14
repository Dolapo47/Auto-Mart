/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import users from '../db/userDb';
import validateRegisterInput from '../helper/validations/validateRegeisterInput';
import validateLogin from '../helper/validations/validateLogin';
import { generateToken } from '../helper/userHelpers';
import { responseMessage, userMessage } from '../helper/validations/responseMessages';

dotenv.config();

class userController {
  static registerUser(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    const { email, password, } = req.body;
    if (!isValid) return responseMessage(res, 400, errors);

    const checkedEmail = users.filter(user => user.email === email.trim());

    if (checkedEmail.length > 0) return responseMessage(res, 409, 'The user already exist');

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password.trim(), salt, (err, hash) => {
        const user = {
          id: users.length + 1,
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: hash,
          address: req.body.address,
          admin: false,
        };
        users.push(user);
        const token = generateToken(user.email, user.id);
        return userMessage(res, 201, 'user registered', token, user);
      });
    });
  }

  static loginUser(req, res) {
    const { errors, isValid } = validateLogin(req.body);
    const { email, password } = req.body;
    if (!isValid) return responseMessage(res, 400, errors);
    const loginUser = users.filter(user => user.email === email.trim());
    if (loginUser.length < 1) return responseMessage(res, 404, 'Auth Failed');

    bcrypt.compare(password.trim(), loginUser[0].password, (err, result) => {
      if (result) {
        const token = generateToken(loginUser[0].email, loginUser[0].id);
        return userMessage(res, 200, 'Auth Successful', token, loginUser[0]);
      }
      return responseMessage(res, 401, 'Auth Failed');
    });
  }
}

export default userController;
