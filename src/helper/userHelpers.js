import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { responseMessage } from './validations/responseMessages';
import vehicles from '../db/carDb';


dotenv.config();
const secretKey = process.env.SECRET;

// eslint-disable-next-line import/prefer-default-export
export const generateToken = (email, userId) => {
  const token = jwt.sign({ email, userId }, secretKey, { expiresIn: '1h' });
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(401).send({ status: 'error', error: 'You must be logged in to use this route' });
  const decoded = jwt.verify(token, process.env.SECRET);


  req.user = decoded;

  return next();
};
