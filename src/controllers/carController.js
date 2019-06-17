/* eslint-disable import/no-named-as-default */
/* eslint-disable require-jsdoc */
import vehicles from '../db/carDb';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';
import carQueries from '../helper/carHelpers';

class carController {
  static createCar(req, res) {
    const vehicle = {
      id: vehicles.length + 1,
      userId: 3,
      state: req.body.state,
      status: 'available',
      price: req.body.price,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      bodyType: req.body.bodyType
    };
    vehicles.push(vehicle);
    return retrieveCarMessage(res, 201, 'Vehicle created successfully', vehicle);
  }

  static getAllCars(req, res) {
    if (vehicles.length === 0) return responseMessage(res, 404, 'No vehicle found');
    return retrieveCarMessage(res, 200, 'Vehicles successfully retrieved', vehicles);
  }

  static getOneCar(req, res) {
    const id = parseInt(req.params.car_id, 10);
    const item = carQueries.findOneCar(id);
    if (!item) return responseMessage(res, 404, 'No vehicle matched the specified criteria');
    return retrieveCarMessage(res, 200, 'Vehicles successfully retrieved', item);
  }

  static updateStatus(req, res) {
    const id = parseInt(req.params.car_id, 10);
    const userId = parseInt(req.body.userId, 10);
    const { status } = req.body;
    const item = carQueries.findOneCar(id, userId);
    if (!item) return responseMessage(res, 404, 'No vehicle matched the specified criteria');
    item.status = status;
    return retrieveCarMessage(res, 200, 'Vehicle successfully updated', item);
  }

  static updatePrice(req, res) {
    const id = parseInt(req.params.car_id, 10);
    const userId = parseInt(req.body.userId, 10);
    const { price } = req.body;
    const item = carQueries.findOneCar(id, userId);
    if (!item) return responseMessage(res, 404, 'No vehicle matched the specified criteria');
    item.status = price;
    return retrieveCarMessage(res, 200, 'Vehicle successfully updated', item);
  }

  static deleteCar(req, res) {
    const id = parseInt(req.params.car_id, 10);
    const car = carQueries.findOneCar(id);
    if (!car) return responseMessage(res, 404, 'car not found');
    const carIndex = vehicles.indexOf(car);
    vehicles.splice(carIndex, 1);
    return responseMessage(res, 200, 'car successfully deleted');
  }
}

export default carController;
