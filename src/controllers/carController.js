/* eslint-disable camelcase */
/* eslint-disable import/no-named-as-default */
/* eslint-disable require-jsdoc */
import Cloudinary from 'cloudinary';
import vehicles from '../db/carDb';
import { responseMessage, retrieveCarMessage } from '../helper/validations/responseMessages';
import carQueries from '../helper/carHelpers';
import getUserFromToken from '../helper/userHelpers';

const cloudinary = Cloudinary.v2;

cloudinary.config({
  cloud_name: 'dolapo',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class carController {
  static createCar(req, res) {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      if (err) return responseMessage(res, 422, 'photo could not be uploaded');
      const vehicle = {
        id: vehicles.length + 1,
        userId: 3,
        state: req.body.state,
        status: 'available',
        price: req.body.price,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        bodyType: req.body.bodyType,
      };
      vehicles.push(vehicle);
      return retrieveCarMessage(res, 201, 'Vehicle created successfully', vehicle);
    });
  }

  static availableCars(req, res, next) {
    const { status } = req.query;
    if (status === undefined) {
      return next();
    }
    const cars = vehicles.filter(car => car.status === status);
    if (cars.length > 0) {
      retrieveCarMessage(res, 200, 'vehicles retrieved successfully', cars);
    } else {
      responseMessage(res, 404, 'No car matched the specified criteria');
    }
  }

  static filterAvailableCars(req, res, next) {
    const { status, min_price, max_price } = req.query;
    console.log(req.query);
    if (min_price === undefined || max_price === undefined) {
      return next();
    }
    const cars = vehicles.filter(car => car.status === status
      && car.price >= min_price && car.price <= max_price);
    if (cars.length > 0) {
      retrieveCarMessage(res, 200, 'vehicles retrieved successfully', cars);
    } else {
      responseMessage(res, 404, 'No car matched the specified criteria');
    }
  }

  static getAllCars(req, res) {
    if (vehicles.length === 0) return responseMessage(res, 404, 'No vehicle found');
    return retrieveCarMessage(res, 200, 'Vehicles successfully retrieved just get', vehicles);
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
