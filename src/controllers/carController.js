/* eslint-disable require-jsdoc */
import vehicles from '../db/carDb';
import validateCarInput from '../helper/validations/validateCarInput';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';
import carQueries from '../helper/carHelpers';

class carController {
  static createCar(req, res) {
    // const { errors, isValid } = validateCarInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json({ errors });
    // }
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

  // static getAvailableCars(req, res) {
  //   const { status } = req.query;
  //   const isInvalidStatus = (status !== 'available');
  //   if (isInvalidStatus) return errorMessage(res, 403, 'you do not have access to this resource');
  //   const availableCars = vehicles.find(car => car.status === 'available');
  //   if (!availableCars) return errorMessage(res, 404, 'No vehicle matched the specified criteria');
  //   return retrieveCarMessage(res, 200, 'Vehicles successfully retrieved', availableCars);
  // }

  static updateStatus(req, res) {
    const id = parseInt(req.params.car_id, 10);
    const userId = parseInt(req.body.userId, 10);
    const item = carQueries.findCar(id, userId);
    item.status = req.body.status;
    if (!item) return responseMessage(res, 404, 'No vehicle matched the specified criteria');
    return responseMessage(res, 200, 'Vehicle successfully updated');
  }

  static updatePrice(req, res) {
    const id = parseInt(req.params.car_id, 10);
    const userId = parseInt(req.body.userId, 10);
    const item = carQueries.findOneCar(id, userId);
    item.price = req.body.price;
    console.log(item);
    if (!item) return responseMessage(res, 404, 'No vehicle matched the specified criteria');
    return responseMessage(res, 200, 'Vehicle successfully updated');
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
