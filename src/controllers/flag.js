/* eslint-disable require-jsdoc */
import db from '../db/flagDb';
import validateFlagInput from '../helper/validations/validateFlagInput';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';

class flagController {
  static createFlag(req, res) {
    const { errors, isValid } = validateFlagInput(req.body);
    if (!isValid) return responseMessage(res, 422, errors);

    const flag = {
      id: db.length + 1,
      carId: req.body.carId,
      reason: req.body.reason,
      description: req.body.description,
    };

    db.push(flag);
    return retrieveCarMessage(res, 201, 'flag successfully created', flag);
  }
}

export default flagController;
