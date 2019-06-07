"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _carController = _interopRequireDefault(require("../controllers/carController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/car', _carController["default"].getAllCars);
router.get('/car/:car_id', _carController["default"].getOneCar);
router.post('/car', _carController["default"].createCar);
router.patch('/car/:car_id/status', _carController["default"].updateStatus);
router.patch('/car/:car_id/price', _carController["default"].updatePrice);
router["delete"]('/car/:car_id', _carController["default"].deleteCar);
var _default = router;
exports["default"] = _default;