/* eslint-disable require-jsdoc */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import users from '../db/userDb';
import validateRegisterInput from '../helper/validations/validateRegeisterInput';
import validateLogin from '../helper/validations/validateLogin';

dotenv.config();

class userController {
  static registerUser(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    const { email, password, } = req.body;
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const checkedEmail = users.filter(user => user.email === email);
    if (checkedEmail.length > 0) {
      return res.status(409).json({ status: 409, error: 'The user already exist', });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
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
        const token = jwt.sign({ email: user.email, userId: user.id }, process.env.SECRET, { expiresIn: '1h', });
        res.status(201).json({ status: 201, success: 'user registered', data: [{ token, user }], });
      });
    });
  }

  static loginUser(req, res) {
    const { errors, isValid } = validateLogin(req.body);
    const { email, password } = req.body;
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    const loginUser = users.filter(user => user.email === email);
    if (loginUser.length < 1) {
      return res.status(404).json({ message: 'Auth Failed', });
    }
    bcrypt.compare(password, loginUser[0].password, (err, result) => {
      if (result) {
        const token = jwt.sign({ email: loginUser[0].email, id: loginUser[0].id, },
          process.env.SECRET,
          { expiresIn: '1h', });
        return res.status(200).json({ message: 'Auth Successful', user: loginUser[0], token, });
      }
      res.status(401).json({ message: 'Auth Failed', });
    });
  }
}

export default userController;
