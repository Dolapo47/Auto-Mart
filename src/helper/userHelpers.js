/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secretKey = process.env.SECRET;


export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) res.status(401).send({ status: 401, error: 'You must be logged in to use this route' });
  const token = req.headers.authorization.split(' ')[1];
  const token1 = req.headers.authorization;
  if (req.headers.authorization.split(' ')[0] === 'Bearer') {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } else if (req.headers.authorization !== 'undefined') {
    const decoded = jwt.verify(token1, secretKey);
    req.user = decoded;
    next();
  } else {
    return 'provide a valid token';
  }
};
