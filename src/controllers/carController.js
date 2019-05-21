/* eslint-disable require-jsdoc */
import vehicles from '../db/carDb';
// import validateCarInput from '../helper/validations/validateCarInput';

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
      body_type: req.body.bodyType
    };

    vehicles.push(vehicle);
    return res.status(201).json({
      status: 201,
      message: 'Vehicle created successfully',
      data: vehicle,
    });
  }

  static getAllCars(req, res) {
    const available = vehicles.filter(vehicle => vehicle.status === 'available');
    if (available.length === 0) {
      res.status(404).json({
        status: 404,
        message: 'No vehicle matched the specified criteria',
      });
    } else {
      res.status(200).json({
        status: 200,
        message: 'Vehicles retrieved successfully',
        data: available,
      });
    }
  }

  static getOneCar(req, res) {
    const id = parseInt(req.params.car_id, 10);
    const item = vehicles.filter(vehicle => vehicle.id === id);
    if (item.length === 0) {
      res.status(404).json({
        status: 404,
        message: 'No vehicle matched the specified criteria',
      });
    } else {
      res.status(200).json({
        status: 200,
        message: 'Vehicle retrieved successfully',
        data: item,
      });
    }
  }

  static deleteCar(req, res) {
    const id = parseInt(req.params.car_id, 10);
    // eslint-disable-next-line array-callback-return
    vehicles.map((vehicle, index) => {
      if (vehicle.id === id) {
        vehicles.splice(index, 1);
        return res.status(200).json({
          status: 200,
          message: 'Vehicle successfully deleted',
          data: vehicles,
        });
      }
    });
    return res.status(404).json({
      status: 404,
      message: 'vehicle not found',
    });
  }
}

export default carController;
