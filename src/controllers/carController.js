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
}

export default carController;
