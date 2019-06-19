import validator from 'validator';
import { isEmpty, isInteger } from '../isEmpty';

const validateFlagInput = (data) => {
  const errors = {};

  data.carId = isEmpty(data.carId) === true ? '' : data.carId;
  data.reason = isEmpty(data.reason) === true ? '' : data.reason;
  data.description = isEmpty(data.description) === true ? '' : data.description;

  if (validator.isEmpty(data.carId)) errors.carId = 'carId field is required';

  if (validator.isEmpty(data.reason)) errors.reason = 'reason field is required';

  if (validator.isEmpty(data.description)) errors.description = 'description field is required';

  if (!isInteger(data.carId)) {
    errors.carId = 'only interger numbers allowed';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateFlagInput;
