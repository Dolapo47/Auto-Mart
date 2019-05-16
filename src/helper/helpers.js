import Joi from 'joi';

exports.validateRegisterUserSchema = {
  email: Joi.string().email().max(35).required(),
  first_name: Joi.string().max(15).regex(/^[a-zA-Z]+$/).required(),
  last_name: Joi.string().max(15).regex(/^[a-zA-Z]+$/).required(),
  password: Joi.string().min(6).max(15).required(),
  address: Joi.string().max(40).required(),
};
