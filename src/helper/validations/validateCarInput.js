import {
  isNotSpecified,
  pureNumber,
  money,
  pureString
} from './validator.schema';

import { responseMessage } from './responseMessages';


// eslint-disable-next-line import/prefer-default-export
export const validatePostCar = [
  /**
     * VALIDATION ORDER:
     *  state
     *  price
     *  manufacturer
     *  model
     *  bodyType
     *  image
     */

  // STATE VALIDATION: ensure state is either new or used
  (req, res, next) => {
    const { state } = req.body;
    if (!state) {
      return responseMessage(res, 422,
        'please specify the state of the automobile (new/used)');
    }
    const lowerCase = state.toLowerCase();
    return (lowerCase === 'new' || lowerCase === 'used')
      ? next()
      : responseMessage(res, 422, 'car state can either be "new" or "used"');
  },
  // PRICE VALIDATION
  (req, res, next) => {
    const { price } = req.body;
    const message = isNotSpecified(price, 'price')
            || money.doValidation(price, 'price', 12);
    return message
      ? responseMessage(res, 422, message)
      : next();
  },

  // MANUFACTURER VALIDATION
  (req, res, next) => {
    const { manufacturer } = req.body;
    const message = isNotSpecified(manufacturer, 'manufacturer')
            || pureString.isInvalid(manufacturer, 'manufacturer')
            || pureString.isTooLong(manufacturer, 'manufacturer', 30);

    return message
      ? responseMessage(res, 422, message)
      : next();
  },

  // MODEL VALIDATION
  (req, res, next) => {
    const { model } = req.body;
    const message = isNotSpecified(model, 'model')
            || pureString.isNotAlphaNumeric(model, 'model')
            || pureString.isTooLong(model, 'model', 30);

    return message
      ? responseMessage(res, 422, message)
      : next();
  },

  // BODY TYPE VALIDATION
  (req, res, next) => {
    const { bodyType } = req.body;
    const message = isNotSpecified(bodyType, 'body type')
            || pureString.isInvalid(bodyType, 'body type')
            || pureString.isTooLong(bodyType, 'body type', 25);

    return message
      ? responseMessage(res, 422, message)
      : next();
  },
];

export const validateIdParam = (req, res, next) => {
  const { carId } = req.params;
  const message = isNotSpecified(carId, 'car id')
      || pureNumber.isInvalid(carId, 'car id');
  req.params.carId = +carId;
  return message
    ? responseMessage(res, 422, message)
    : next();
};


export const validatePatchPrice = [
  validateIdParam,
  // PRICE VALIDATION
  (req, res, next) => {
    const { newPrice } = req.body;
    const message = isNotSpecified(newPrice, 'new price')
          || money.doValidation(newPrice, 'new price', 12);
    return message
      ? responseMessage(res, 422, message)
      : next();
  }
];
