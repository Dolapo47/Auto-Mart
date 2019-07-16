/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secretKey = process.env.SECRET;


export const verifyToken = (req, res, next) => {
  const { token } = req.body;
  if (!token) res.status(401).send({ status: 401, error: 'You must be logged in to use this route' });
  console.log(token);
  const decoded = jwt.verify(token, secretKey);
  req.user = decoded;
  return next();
};
