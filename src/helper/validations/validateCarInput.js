// import validator from 'validator';
// import isEmpty from '../isEmpty';

// export const validateNewCar = (data) => {
//   const errors = {};

//   // Data.name may be empty but may not be a string
//   // we need to ensure that if its empty (using our custom IsEmpty method to check)
//   // we make it an empty string which can now be checked by the validator.isEmpty method
//   // The reason being that validator.isEmpty can only check for empty string not empty object

//   data.state = isEmpty(data.state) === true ? '' : data.state;
//   data.price = isEmpty(data.price) === true ? '' : data.price;
//   data.manufacturer = isEmpty(data.manufacturer) === true ? '' : data.manufacturer;
//   data.model = isEmpty(data.model) === true ? '' : data.model;
//   data.bodyType = isEmpty(data.bodyType) === true ? '' : data.bodyType;

//   if (validator.isEmpty(data.state)) {
//     errors.state = 'State of vehicle is required';
//   }

//   if (validator.isEmpty(data.price)) {
//     errors.price = 'Price of vehicle is required';
//   }

//   if (validator.isEmpty(data.manufacturer)) {
//     errors.manufacturer = 'Manufacturer of vehicle is required';
//   }

//   if (validator.isEmpty(data.model)) {
//     errors.model = 'Model of vehicle is required';
//   }

//   if (validator.isEmpty(data.bodyType)) {
//     errors.bodyType = 'body type of vehicle is required';
//   }
//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };

// export default validateNewCar;
