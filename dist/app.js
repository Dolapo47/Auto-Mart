"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _winston = _interopRequireDefault(require("winston"));

require("@babel/polyfill");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _cors = _interopRequireDefault(require("cors"));

var _yamljs = _interopRequireDefault(require("yamljs"));

var _user = _interopRequireDefault(require("./routes/user"));

var _vehicle = _interopRequireDefault(require("./routes/vehicle"));

var _order = _interopRequireDefault(require("./routes/order"));

var _flag = _interopRequireDefault(require("./routes/flag"));

var _responseMessages = require("./helper/validations/responseMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use((0, _morgan["default"])('dev'));

var swaggerDocument = _yamljs["default"].load("".concat(__dirname, "/../swagger.yaml"));

app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerDocument));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])({
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
}); // cross origin resource sharing middleware

app.use((0, _cors["default"])());
app.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    data: [{
      message: 'welcome to automart'
    }]
  });
});
app.use('/api/v1', _user["default"]);
app.use('/api/v1', _vehicle["default"]);
app.use('/api/v1', _order["default"]);
app.use('/api/v1', _flag["default"]);
app.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'Route does not exist'
  });
});
app.use(function (err, req, res) {
  if (err) return (0, _responseMessages.errorMessage)(res, 500, 'internal server error');
});
app.listen(port, function () {
  _winston["default"].info("Server is running on port ".concat(port));
});
var _default = app;
exports["default"] = _default;