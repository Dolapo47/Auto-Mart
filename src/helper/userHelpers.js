/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
// const secretKey = process.env.SECRET;


export const verifyToken = (req, res, next) => {
  if (req.headers.authorization) res.status(401).send({ status: 401, error: 'You must be logged in to use this route' });
  const token = req.headers.authorization.split(' ')[1];
  console.log('toooookeeeen', token);
  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = decoded;
  return next();
};
