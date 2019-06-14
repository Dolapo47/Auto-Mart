import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateRegisterInput = (data) => {
  const errors = {};

  data.email = isEmpty(data.email) === true ? '' : data.email;
  data.first_name = isEmpty(data.first_name) === true ? '' : data.first_name;
  data.last_name = isEmpty(data.last_name) === true ? '' : data.last_name;
  data.password = isEmpty(data.password) === true ? '' : data.password;
  data.address = isEmpty(data.address) === true ? '' : data.address;

  if (!Validator.isAlpha(data.last_name)) {
    errors.last_name = 'Last name must be only alphabets';
  }
  if (Validator.isEmpty(data.last_name)
  || !Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = 'Last name must be between 2 and 30 characters';
  }
  if (!Validator.isAlpha(data.first_name)) {
    errors.first_name = 'First name must be only alphabets';
  }
  if (Validator.isEmpty(data.first_name)
  || !Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = 'First name must be between 2 and 30 characters';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'The Email is invalid';
  }
  if (!Validator.isLength(data.password, { min: 8, max: 60 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'The address field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegisterInput;
