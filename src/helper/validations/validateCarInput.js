/* eslint-disable require-jsdoc */
import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateCarInput = (data) => {
  const errors = {};

  // Data.name may be empty but may not be a string
  // we need to ensure that if its empty (using our custom IsEmpty method to check)
  // we make it an empty string which can now be checked by the validator.isEmpty method
  // The reason being that validator.isEmpty can only check for empty string not empty object

  data.state = isEmpty(data.state) === true ? '' : data.state;
  data.status = isEmpty(data.status) === true ? '' : data.status;
  data.price = isEmpty(data.price) === true ? '' : data.price;
  data.manufacturer = isEmpty(data.manufacturer) === true ? '' : data.manufacturer;
  data.model = isEmpty(data.model) === true ? '' : data.model;
  data.bodyType = isEmpty(data.bodyType) === true ? '' : data.bodyType;

  if (!Validator.isAlpha(data.state)) {
    errors.state = 'State must be in alphabet';
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = 'State of vehicle is required';
  }

  if (!Validator.isNumeric(data.price)) {
    errors.price = 'price should be number and in this format (0.00)';
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'Price of vehicle is required';
  }

  if (!Validator.isAlpha(data.manufacturer)) {
    errors.manufacturer = 'Manufacturer must be in alphabets';
  }

  if (Validator.isEmpty(data.manufacturer)) {
    errors.manufacturer = 'Manufacturer of vehicle is required';
  }

  if (!Validator.isAlphanumeric(data.model)) {
    errors.model = 'Model of vehicle can only be alphanumeric';
  }

  if (Validator.isEmpty(data.model)) {
    errors.model = 'Model of vehicle is required';
  }

  if (!Validator.isAlpha(data.bodyType)) {
    errors.bodyType = 'Body-type must be alphabets';
  }

  if (Validator.isEmpty(data.bodyType)) {
    errors.bodyType = 'Body-type of vehicle is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateCarInput;
