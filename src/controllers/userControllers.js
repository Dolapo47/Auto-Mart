/* eslint-disable require-jsdoc */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import users from '../db/db';
import validateRegisterInput from '../helper/validations/validateRegeisterInput';

dotenv.config();

class userController {
  static registerUser(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    const {
      email,
    } = req.body;

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const checkedEmail = users.filter(user => user.email === email);
    if (checkedEmail.length > 0) {
      res.status(400).json({
        status: 400,
        error: 'the email is already taken. the user already exist. register with another unique email',
      });
    } else {
      const user = {
        id: users.length + 1,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        address: req.body.address,
        admin: false,
      };

      const token = jwt.sign({ user: users.push(user) }, process.env.SECRET);
      res.status(201).json({
        status: 201,
        success: 'user registered',
        data: [{ token, user }],
      });
    }
  }
}

export default userController;
