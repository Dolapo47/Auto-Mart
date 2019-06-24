import validator from 'validator';
import { isEmpty, isFloat } from '../isEmpty';

const validateCarInput = (data) => {
  const errors = {};

  data.state = isEmpty(data.state) === true ? '' : data.state;
  data.price = isEmpty(data.price) === true ? '' : data.price;
  data.manufacturer = isEmpty(data.manufacturer) === true ? '' : data.manufacturer;
  data.model = isEmpty(data.model) === true ? '' : data.model;
  data.bodyType = isEmpty(data.bodyType) === true ? '' : data.bodyType;

  if (validator.isEmpty(data.state)) errors.state = 'state field is required';
  if (validator.isEmpty(data.status)) errors.status = 'status field is required';
  if (validator.isEmpty(data.price)) errors.price = 'price field is required';
  if (validator.isEmpty(data.manufacturer)) errors.manufacturer = 'manufacturer field is required';
  if (validator.isEmpty(data.model)) errors.model = 'model field is required';
  if (validator.isEmpty(data.bodyType)) errors.bodyType = 'bodyType field is required';

  if (isFloat(data.price)) errors.price = 'only decimal numbers allowed (12.00)';
  if (!validator.isAlpha(data.state)) errors.state = 'state must be only alphabets';
  if (!validator.isAlpha(data.manufacturer)) errors.manufacturer = 'manufacturer must be only alphabets';
  if (!validator.isAlpha(data.model)) errors.model = 'model must be only alphabets';
  if (!validator.isAlpha(data.bodyType)) errors.bodyType = 'body type must be only alphabets';
};

export default validateCarInput;
