/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secretKey = process.env.SECRET;


export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    if (token.split(' ')[1] === 'undefined') {
      token = req.header.authorization;
    }
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
  } else {
    return res.status(401).json({
      status: 401,
      error: 'Please provide a valid token'
    });
  }
};
