/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/**
 *
 * @exports trimmer
 * @class trimmer
 */

class trimmer {
  /**
   * Handles User input validation on sign up
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof UserValidation
   */

  static async signUpTrim(req, res, next) {
    let {
      email, first_name, last_name, address
    } = req.body;

    if (first_name) first_name = first_name.trim();
    if (last_name) last_name = last_name.trim();
    if (email) email = email.trim();
    if (address) address = address.trim();

    req.body.first_name = first_name;
    req.body.last_name = last_name;
    req.body.address = address;
    req.body.email = email;

    return next();
  }

  static async loginTrim(req, res, next) {
    let {
      email,
    } = req.body;

    if (email) email = email.trim();

    req.body.email = email;

    return next();
  }

  static async carTrim(req, res, next) {
    let {
      state, price, manufacturer, model, body_type
    } = req.body;

    if (state) state = state.trim();
    if (manufacturer) manufacturer = manufacturer.trim();
    if (model) model = model.trim();
    if (body_type) body_type = body_type.trim();

    req.body.state = state;
    req.body.manufacturer = manufacturer;
    req.body.model = model;
    req.body.body_type = body_type;

    return next();
  }

  static async carStatusTrim(req, res, next) {
    let {
      status,
    } = req.body;

    if (status) status = status.trim();

    req.body.status = status;

    return next();
  }

  static async carPriceTrim(req, res, next) {


    return next();
  }

  static async orderTrim(req, res, next) {

    return next();
  }

  static async updateOrderTrim(req, res, next) {

    return next();
  }

  static async flagTrim(req, res, next) {
    let {
      car_id, reason, description,
    } = req.body;

    if (car_id) car_id = car_id.trim();
    if (reason) reason = reason.trim();
    if (description) description = description.trim();

    req.body.car_id = car_id;
    req.body.reason = reason;
    req.body.description = description;

    return next();
  }
}

export default trimmer;
