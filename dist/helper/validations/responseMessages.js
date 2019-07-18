"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveCarMessage = exports.userMessage = exports.errorMessage = void 0;

var errorMessage = function errorMessage(res, statusCode, message) {
  res.status(statusCode).json({
    status: statusCode,
    error: message
  });
};

exports.errorMessage = errorMessage;

var userMessage = function userMessage(res, statusCode, message, token, user) {
  res.status(statusCode).json({
    status: statusCode,
    success: message,
    data: {
      token: token,
      user: user
    }
  });
};

exports.userMessage = userMessage;

var retrieveCarMessage = function retrieveCarMessage(res, statusCode, message, car) {
  res.status(statusCode).json({
    status: statusCode,
    success: message,
    data: car
  });
};

exports.retrieveCarMessage = retrieveCarMessage;