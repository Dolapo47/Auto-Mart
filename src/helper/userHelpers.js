import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorMessage } from './validations/responseMessages';


dotenv.config();
const secretKey = process.env.SECRET;

export const generateToken = (email, userId) => {
  const token = jwt.sign({ email, userId }, secretKey, { expiresIn: 84600 });
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return errorMessage(res, 401, 'Authorization token was not provided');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.body.userId = decoded.userId;
    req.user = decoded;
    return next();
  } catch (err) {
    return errorMessage(res, 401, 'Invalid authorization token');
  }
};
