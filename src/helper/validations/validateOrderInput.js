import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateOrderInput = (data) => {
  const errors = {};
  data.amount_offered = isEmpty(data.amount_offered) === true ? '' : data.amount_offered;
  data.userId = isEmpty(data.userId) === true ? '' : data.userId;
  data.carId = isEmpty(data.carId) === true ? '' : data.carId;
  if (!Validator.isFloat(data.amount_offered)) {
    errors.amount_offered = 'Number must be in 0.00 format';
  }

  if (Validator.isEmpty(data.amount_offered)
    || !Validator.isLength(data.amount_offered, { min: 1, max: 13 })) {
    errors.amount_offered = 'Last name must be between 1 and 13 characters';
  }

  if (!Validator.isNumeric(data.userId)) {
    errors.userId = 'User id should be a number';
  }

  if (Validator.isEmpty(data.userId)
    || !Validator.isLength(data.userId, { min: 1, max: 3 })) {
    errors.userId = 'Last name must be between 1 and 3 characters';
  }

  if (!Validator.isNumeric(data.carId)) {
    errors.carId = 'Car id should be a number';
  }

  if (Validator.isEmpty(data.carId)
    || !Validator.isLength(data.carId, { min: 1, max: 3 })) {
    errors.carId = 'Last name must be between 1 and 3 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};


export default validateOrderInput;
