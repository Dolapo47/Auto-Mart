/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
// const secretKey = process.env.SECRET;


export const verifyToken = (req, res, next) => {
  if (req.headers.authorization) throw new Error('No token provided, You do not have access to this page');
  const token = req.headers.authorization.split(' ')[1];
  console.log('toooookeeeen', token);
  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = decoded;
  return next();
};
