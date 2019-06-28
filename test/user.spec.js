import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import dotenv from 'dotenv';
import app from '../src/app';

dotenv.config();
const { expect } = chai;

chai.use(chaiHttp);
let adminUserToken;
let userToken;
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiZG9sYXBvIiwibGFzdG5hbWUiOiJhZGVsZXllIiwiZW1haWwiOiJkb2xhcG9AYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGd0emtNLjJqaExucnVXWkJhVFFybC5PU1pSekV0QjlwaHdKUWRXWDdPaTRvOTZwVzJpam9LIiwiYWRkcmVzcyI6IjEzMSBpamVzaGEgcm9hZCIsImlzX2FkbWluIjoiZiIsImlhdCI6MTU2MTM4NTY2Nn0.8T9lE2PcQn-NdPwLzU6m3eYfyvCcxB2VSo-iqX-gN2';

const adminUser = {
  lastname: faker.name.lastName(),
  firstname: faker.name.firstName(),
  email: faker.internet.email(),
  password: 'dolapo2018@@',
  address: '12 gabriel olusanya',
  adminSecret: 'dappy'
};

const user = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'dolapo2018@@',
  address: '12 gabriel olusanya',
  is_admin: ''
};


describe('Can register new user', () => {
  it('should allow user signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(adminUser)
      .end((err, res) => {
        if (err)done();
        adminUserToken = res.body.data.token;
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should throw error if user already signed up', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Hane@yahoo.com',
        firstname: 'Murray',
        lastname: 'Kohler',
        password: 'dolapo2018@@',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(409);
        done();
      });
  });
});

describe('Can register new user', () => {
  it('should allow user signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err)done();
        userToken = res.body.data.token;
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        done();
      });
  });
});

describe('Can register new user', () => {
  it('should allow user signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Sean.Hane@yahoo.com',
        password: 'dolapo2018@@',
      })
      .end((err, res) => {
        if (err)done();
        adminUserToken = res.body.data.token;
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
