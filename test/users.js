/* eslint-disable require-jsdoc */
import jwt from 'jsonwebtoken';

function generateValidToken(userObject) {
  return jwt.sign(userObject, process.env.SECRET).toString();
}

const users = {
  admin: {
    id: 7,
    first_name: 'Murray',
    last_name: 'Kohler',
    address: '239, ikoroduroad',
    email: 'Sean.Hane@yahoo.com',
    password: 'dolapo2018@@',
    is_admin: 't'
  },
  validUser: {
    id: 6,
    first_name: 'Gail',
    last_name: 'Heathcote',
    address: '234567, gdfcvcsyh',
    email: 'Darrell1@gmail.com',
    password: 'dolapo2018@@',
    is_admin: 'f',
  },

  invalidUser: {
    id: 10000,
    first_name: 'ayomide',
    last_name: 'adeleye',
    address: '234567, gdfcvcsyh',
    email: 'amadi@aol.com',
    is_admin: 'f',
  },
};


export {
  generateValidToken,
  users,
};
