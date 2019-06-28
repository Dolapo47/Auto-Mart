/* eslint-disable require-jsdoc */
import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_URL;
}
if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
}

// Instantiate pool
const pool = new Pool({
  connectionString
});

class Db {
  static query(queryString, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(queryString, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default Db;
