"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/prefer-default-export */
_dotenv["default"].config();

var secretKey = process.env.SECRET;

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  if (!token) res.status(401).send({
    status: 401,
    error: 'You must be logged in to use this route'
  });

  var decoded = _jsonwebtoken["default"].verify(token, secretKey);

  req.user = decoded;
  return next();
};

exports.verifyToken = verifyToken;