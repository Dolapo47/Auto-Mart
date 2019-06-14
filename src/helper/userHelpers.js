import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorMessage } from './validations/responseMessages';


dotenv.config();
const secretKey = process.env.SECRET;

// eslint-disable-next-line import/prefer-default-export
export const generateToken = (email, userId) => {
  const token = jwt.sign({ email, userId }, secretKey, { expiresIn: 84600 });
  return token;
};
