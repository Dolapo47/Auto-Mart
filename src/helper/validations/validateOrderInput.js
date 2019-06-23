import validator from 'validator';
import { isEmpty, isFloat, isInteger } from '../isEmpty';

export const validateOrderInput = (data) => {
  const errors = {};

  data.carId = isEmpty(data.carId) === true ? '' : data.carId;
  data.priceOffered = isEmpty(data.priceOffered) === true ? '' : data.priceOffered;

  if (validator.isEmpty(data.carId)) errors.carId = 'carId field is required';
  if (validator.isEmpty(data.priceOffered)) errors.priceOffered = 'price offered field is required';
  if (!isInteger(data.carId)) errors.carId = 'only interger numbers allowed';
  if (isFloat(data.priceOffered)) errors.priceOffered = 'only decimal numbers allowed (12.00)';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const validateOrderUpdate = (data) => {
  const errors = {};

  data.userId = isEmpty(data.userId) === true ? '' : data.userId;
  data.amountOffered = isEmpty(data.amountOffered) === true ? '' : data.amountOffered;

  if (validator.isEmpty(data.userId)) errors.userId = 'userId field is required';
  if (validator.isEmpty(data.amountOffered)) errors.amountOffered = 'amountOffered field is required';
  if (isFloat(data.amountOffered)) errors.amountOffered = 'only decimal numbers allowed (12.00)';
  if (!isInteger(data.userId)) errors.userId = 'only interger numbers allowed';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
