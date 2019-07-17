/* eslint-disable require-jsdoc */
import joi from 'joi';

class validate {
  static validateUser(user) {
    const schema = joi.object().keys({
      email: joi.string()
        .email()
        .trim()
        .error(() => 'email is required and must be a valid email'),
      first_name: joi.string()
        .regex(/^[A-Za-z]+$/)
        .required()
        .error(() => 'Firstname is required and must contain only alphabets'),
      last_name: joi.string()
        .regex(/^[A-Za-z]+$/)
        .required()
        .error(() => 'Firstname is required and must contain only alphabets'),
      password: joi.string()
        .required()
        .min(6),
      address: joi.string().required(),
    });
    return joi.validate(user, schema);
  }

  static validateLogin(details) {
    const schema = joi.object().keys({
      email: joi.string().email().trim()
        .error(() => 'email is required and must be a valid email'),
      password: joi.string().min(6).required()
        .error(() => 'password is required and must be at least 6 characters long'),
    });
    return joi.validate(details, schema);
  }

  static validateCarInput(details) {
    const schema = joi.object().keys({
      state: joi.string().insensitive().valid('new', 'used').regex(/^[0-9]+$/)
        .required()
        .error(() => 'state can only be new or used'),
      price: joi.number(),
      manufacturer: joi.string().regex(/^[A-Za-z]+$/).trim()
        .required(),
      model: joi.string().regex(/^[a-zA-Z0-9]*$/).trim()
        .required()
        .error(() => 'only alphanumeric characters allowed'),
      body_type: joi.string().insensitive()
        .valid('car', 'van', 'truck', 'trailer')
        .required()
        .error(() => 'body type can be car, van, truck, trailer'),
      image_url: joi.string(),
      fuel_type: joi.string(),
      fuel_cap: joi.number(),
      mileage: joi.number(),
      color: joi.string(),
      description: joi.string(),
      transmission_type: joi.string(),
      img_url: joi.string(),
      dvd_player: joi,
      fm_radio: joi,
      air_bag: joi,
      arm_rest: joi,
      tinted_windows: joi,
      ac: joi,
      doors: joi,
      token: joi,
      Authorization: joi,
      status: joi,
      year: joi,
    });
    return joi.validate(details, schema);
  }

  static validateUpdatePrice(details) {
    const schema = joi.object().keys({
      price: joi.number()
        .required(),
      token: joi,
      Authorization: joi,
    });
    return joi.validate(details, schema);
  }

  static validateUpdateStatus(details) {
    const schema = joi.object().keys({
      status: joi.string()
        .insensitive()
        .valid('available', 'sold')
        .trim()
        .required(),
      token: joi,
      Authorization: joi,
    });
    return joi.validate(details, schema);
  }

  static validateOrderInput(details) {
    const schema = joi.object().keys({
      car_id: joi.string()
        .regex(/^[0-9]+$/)
        .required(),
      price_offered: joi.string()
        .regex(/^\d*(\.\d{2})?$/)
        .regex(/^[0-9]*[1-9][0-9]*$/)
        .required(),
    });
    return joi.validate(details, schema);
  }

  static validatePatchOrder(details) {
    const schema = joi.object().keys({
      new_offer: joi.string(),
      order_id: joi.string(),
      token: joi,
      Authorization: joi,
      price: joi,
      amount: joi.string(),
    });
    return joi.validate(details, schema);
  }

  static validateFlagInput(details) {
    const schema = joi.object().keys({
      car_id: joi.string()
        .regex(/^[0-9]+$/)
        .required(),
      reason: joi.string()
        .trim()
        .required(),
      description: joi.string()
        .trim()
        .required(),
    });
    return joi.validate(details, schema);
  }

  static validateParams(id) {
    const schema = joi.object().keys({
      id: joi.number()
        .integer()
        .error(() => 'invalid id')
        .required()
    });
    return joi.validate(id, schema);
  }
}

export default validate;
