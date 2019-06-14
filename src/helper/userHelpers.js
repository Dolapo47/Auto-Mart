import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { responseMessage } from './validations/responseMessages';


dotenv.config();
const secretKey = process.env.SECRET;

// eslint-disable-next-line import/prefer-default-export
export const generateToken = (email, userId) => {
  const token = jwt.sign({ email, userId }, secretKey, { expiresIn: 84600 });
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return responseMessage(res, 401, 'Authorization token was not provided');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.body.userId = decoded.userId;
    req.user = decoded;
    return next();
  } catch (err) {
    return responseMessage(res, 401, 'Invalid authorization token');
  }
};
