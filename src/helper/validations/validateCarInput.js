import validator from 'validator';
import isEmpty from '../isEmpty';

const validateCarInput = (data) => {
  const errors = {};

  data.state = isEmpty(data.state) === true ? '' : data.state;
  data.price = isEmpty(data.price) === true ? '' : data.price;
  data.manufacturer = isEmpty(data.manufacturer) === true ? '' : data.manufacturer;
  data.model = isEmpty(data.model) === true ? '' : data.model;
  data.bodyType = isEmpty(data.bodyType) === true ? '' : data.bodyType;


  if (validator.isEmpty(data.state)) {
    errors.state = 'The state field is required';
  }
  if (validator.isEmpty(data.price)) {
    errors.price = 'The price field is required';
  }
  if (validator.isEmpty(data.manufacturer)) {
    errors.manufacturer = 'The manufacturer field is required';
  }
  if (validator.isEmpty(data.model)) {
    errors.model = 'The model field is required';
  }
  if (validator.isEmpty(data.bodyType)) {
    errors.bodyType = 'The body type field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateCarInput;
