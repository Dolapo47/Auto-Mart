/* eslint-disable require-jsdoc */
import joi from '@hapi/joi';

class validate {
  static validateOrder(order) {
    const schema = joi.object().keys({
      amount_offered: joi.number()
        .min(1)
        .max(13)
        .required()
        .error('Amount must be between 1 and 13 digits'),
    });
    return joi.validate(order, schema);
  }
}

export default validate;
