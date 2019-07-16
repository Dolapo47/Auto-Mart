/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secretKey = process.env.SECRET;


export const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send({ status: 401, error: 'You must be logged in to use this route' });
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    return next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ status: 401, error: 'Auth failed' });
  }

};
