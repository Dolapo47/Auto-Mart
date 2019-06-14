import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateUpdateOrder = (data) => {
  const errors = {};
  data.amountOffered = isEmpty(data.amountOffered) === true ? '' : data.amountOffered;
  if (!Validator.isFloat(data.amountOffered)) {
    errors.amountOffered = 'Number must be in 0.00 format';
  }

  if (Validator.isEmpty(data.amountOffered)
        || !Validator.isLength(data.amountOffered, { min: 1, max: 13 })) {
    errors.amountOffered = 'Last name must be between 1 and 13 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateUpdateOrder;
