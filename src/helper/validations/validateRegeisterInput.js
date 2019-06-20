import Validator from 'validator';
import { isEmpty } from '../isEmpty';

const validateRegisterInput = (data) => {
  const errors = {};

  data.email = isEmpty(data.email) === true ? '' : data.email;
  data.firstname = isEmpty(data.firstname) === true ? '' : data.firstname;
  data.lastname = isEmpty(data.lastname) === true ? '' : data.lastname;
  data.password = isEmpty(data.password) === true ? '' : data.password;
  data.address = isEmpty(data.address) === true ? '' : data.address;

  if (!Validator.isAlpha(data.lastname)) errors.lastname = 'Last name must be only alphabets';

  if (Validator.isEmpty(data.lastname)
  || !Validator.isLength(data.lastname, { min: 2, max: 30 })) errors.lastname = 'Last name must be between 2 and 30 characters';

  if (!Validator.isAlpha(data.firstname)) errors.firstname = 'First name must be only alphabets';

  if (Validator.isEmpty(data.firstname)
  || !Validator.isLength(data.firstname, { min: 2, max: 30 })) errors.firstname = 'First name must be between 2 and 30 characters';

  if (!Validator.isEmail(data.email)) errors.email = 'The Email is invalid';

  if (!Validator.isLength(data.password, { min: 8, max: 60 })) errors.password = 'Password must be between 8 and 30 characters';

  if (Validator.isEmpty(data.address)) errors.address = 'The address field is required';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegisterInput;
