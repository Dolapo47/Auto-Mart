/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorMessage } from './validations/responseMessages';


dotenv.config();
// const secretKey = process.env.SECRET;


export const verifyToken = (req, res, next) => {
  if (!req.body.token) errorMessage(res, 401, 'Auth Failed');
  const auth = req.body.token;
  const decoded = jwt.verify(auth, process.env.SECRET);
  req.user = decoded;
  return next();
};
