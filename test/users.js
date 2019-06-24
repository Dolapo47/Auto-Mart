/* eslint-disable require-jsdoc */
import jwt from 'jsonwebtoken';

function generateValidToken(userObject) {
  return jwt.sign(userObject, process.env.SECRET).toString();
}

const users = {
  admin: {
    id: 1,
    firstname: 'dolapo',
    lastname: 'adeleye',
    address: '239, ikoroduroad',
    email: 'dolapo@gmail.com',
    password: 'suppersecurepassword',
    is_admin: 't'
  },
  validUser: {
    id: 2,
    firstname: 'ayomide',
    lastname: 'adeleye',
    address: '234567, gdfcvcsyh',
    email: 'amadi@aol.com',
    password: 'pixel2user',
    is_admin: 'f',
  },
};


export {
  generateValidToken,
  users,
}
;