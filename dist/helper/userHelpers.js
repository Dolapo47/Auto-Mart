"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var secretKey = process.env.SECRET; // eslint-disable-next-line import/prefer-default-export

var generateToken = function generateToken(email, userId) {
  var token = _jsonwebtoken["default"].sign({
    email: email,
    userId: userId
  }, secretKey, {
    expiresIn: '1h'
  });

  return token;
};

exports.generateToken = generateToken;

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.authorization;
  if (!token) res.status(401).send({
    status: 'error',
    error: 'You must be logged in to use this route'
  });

  var decoded = _jsonwebtoken["default"].verify(token, process.env.SECRET);

  req.user = decoded;
  return next();
};

exports.verifyToken = verifyToken;