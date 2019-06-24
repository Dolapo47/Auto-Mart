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

  data.newOffer = isEmpty(data.newOffer) === true ? '' : data.newOffer;

  if (validator.isEmpty(data.newOffer)) errors.newOffer = 'amountOffered field is required';
  if (isFloat(data.newOffer)) errors.amountOffer = 'only decimal numbers allowed (12.00)';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
