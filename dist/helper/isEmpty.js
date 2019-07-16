"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInteger = exports.isFloat = void 0;

var isFloat = function isFloat(value) {
  var regex = /^\d*(\.\d{2})?$/;
  var regInt = /^[0-9]*[1-9][0-9]*$/;

  if (value.match(regex) && value.match(regInt)) {
    return true;
  }
};

exports.isFloat = isFloat;

var isInteger = function isInteger(value) {
  var regInt = /^[0-9]*[1-9][0-9]*$/;

  if (value.match(regInt)) {
    return true;
  }
};

exports.isInteger = isInteger;