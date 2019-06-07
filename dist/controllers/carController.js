"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _carDb = _interopRequireDefault(require("../db/carDb"));

var _validateCarInput2 = _interopRequireDefault(require("../helper/validations/validateCarInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var carController =
/*#__PURE__*/
function () {
  function carController() {
    _classCallCheck(this, carController);
  }

  _createClass(carController, null, [{
    key: "createCar",
    value: function createCar(req, res) {
      var _validateCarInput = (0, _validateCarInput2["default"])(req.body),
          errors = _validateCarInput.errors,
          isValid = _validateCarInput.isValid;

      if (!isValid) {
        return res.status(400).json({
          errors: errors
        });
      }

      var vehicle = {
        id: _carDb["default"].length + 1,
        userId: 3,
        state: req.body.state,
        status: 'available',
        price: req.body.price,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        bodyType: req.body.bodyType
      };

      _carDb["default"].push(vehicle);

      return res.status(201).json({
        status: 201,
        message: 'Vehicle created successfully',
        data: vehicle
      });
    }
  }, {
    key: "getAllCars",
    value: function getAllCars(req, res) {
      if (_carDb["default"].length === 0) {
        res.status(404).json({
          status: 404,
          message: 'No vehicle matched the specified criteria'
        });
      } else {
        res.status(200).json({
          status: 200,
          message: 'Vehicles retrieved successfully',
          data: _carDb["default"]
        });
      }
    }
  }, {
    key: "getOneCar",
    value: function getOneCar(req, res) {
      var id = parseInt(req.params.car_id, 10);

      var item = _carDb["default"].filter(function (vehicle) {
        return vehicle.id === id;
      });

      if (item.length === 0) {
        res.status(404).json({
          status: 404,
          message: 'No vehicle matched the specified criteria'
        });
      } else {
        res.status(200).json({
          status: 200,
          message: 'Vehicle retrieved successfully',
          data: item
        });
      }
    }
  }, {
    key: "deleteCar",
    value: function deleteCar(req, res) {
      var id = parseInt(req.params.car_id, 10); // eslint-disable-next-line array-callback-return

      _carDb["default"].map(function (vehicle, index) {
        if (vehicle.id === id) {
          _carDb["default"].splice(index, 1);

          return res.status(200).json({
            status: 200,
            message: 'Vehicle successfully deleted',
            data: _carDb["default"]
          });
        }
      });

      return res.status(404).json({
        status: 404,
        message: 'vehicle not found'
      });
    }
  }, {
    key: "updatePrice",
    value: function updatePrice(req, res) {
      var id = parseInt(req.params.car_id, 10);
      var price = req.body.price;

      var item = _carDb["default"].filter(function (vehicle) {
        return vehicle.id === id;
      });

      item[0].price = price;

      if (item.length === 0) {
        res.status(404).json({
          status: 404,
          message: 'No vehicle matched the specified criteria'
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: 'Vehicle price updated',
          data: item
        });
      }
    }
  }, {
    key: "updateStatus",
    value: function updateStatus(req, res) {
      var id = parseInt(req.params.car_id, 10);
      var status = req.body.status;

      var item = _carDb["default"].filter(function (vehicle) {
        return vehicle.id === id;
      });

      item[0].status = status;

      if (item.length === 0) {
        res.status(404).json({
          status: 404,
          message: 'No vehicle matched the specified criteria'
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: 'Vehicle status updated',
          data: item
        });
      }
    } // this function has issues

  }, {
    key: "getAvailableCars",
    value: function getAvailableCars(req, res) {
      var _JSON$parse = JSON.parse(req),
          query = _JSON$parse.query;

      var available = _carDb["default"].filter(function (vehicle) {
        return vehicle.status === query.status;
      });

      if (available.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No available vehicle was found'
        });
      }

      res.status(200).json({
        status: 200,
        message: 'Available cars displayed',
        data: available
      });
    }
  }]);

  return carController;
}();

var _default = carController;
exports["default"] = _default;