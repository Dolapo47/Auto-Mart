"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var createUsers = "CREATE TABLE IF NOT EXISTS users (\n   id SERIAL PRIMARY KEY,\n   firstname VARCHAR(50) NOT NULL,\n   lastname VARCHAR(50) NOT NULL,\n   email VARCHAR(50) NOT NULL,\n   password VARCHAR(255) NOT NULL,\n   address VARCHAR(255) NOT NULL,\n   is_admin VARCHAR(20) NOT NULL\n);\n";
var createCars = "CREATE TABLE IF NOT EXISTS cars (\n    id SERIAL PRIMARY KEY,\n    ownerid INTEGER,\n    owneremail VARCHAR(50),\n    createdon TIMESTAMP NOT NULL,\n    state VARCHAR(50) NOT NULL,\n    status VARCHAR(50) NOT NULL,\n    price DECIMAL NOT NULL,\n    manufacturer VARCHAR(155) NOT NULL,\n    model VARCHAR(50) NOT NULL,\n    body_type VARCHAR(50) NOT NULL,\n    image_url VARCHAR(255) NOT NULL,\n    flagged BOOLEAN \n);\n";
var createOrders = " CREATE TABLE IF NOT EXISTS orders (\n id SERIAL PRIMARY KEY,\n car_id INTEGER ,\n buyer_id INTEGER REFERENCES users(id),\n createdon TIMESTAMP,\n amountOffered DECIMAL,\n status CHAR(50)\n);\n";
var createFlags = " CREATE TABLE IF NOT EXISTS flags (\n id SERIAL PRIMARY KEY,\n car_id INTEGER REFERENCES users(id),\n reason VARCHAR(255) NOT NULL,\n description VARCHAR(255) NOT NULL,\n createdon TIMESTAMP NOT NULL\n);\n";
var createQuery = "".concat(createUsers).concat(createCars).concat(createOrders).concat(createFlags);
var _default = createQuery;
exports["default"] = _default;