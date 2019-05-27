"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("./routes/user"));

var _vehicle = _interopRequireDefault(require("./routes/vehicle"));

var _order = _interopRequireDefault(require("./routes/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});
app.get('/', function (req, res) {
  res.send('Welcome to AutoMart');
});
app.use('/api/v1', _user["default"]);
app.use('/api/v1', _vehicle["default"]);
app.use('/api/v1', _order["default"]);
app.use(function (req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use(function (error, req, res) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
var _default = app;
exports["default"] = _default;