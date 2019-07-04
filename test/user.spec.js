import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
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
  adminSecret: 'd',
};

describe('Can register new user', () => {
  it('should allow administrator signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(adminUser)
      .end((err, res) => {
        if (err)done();
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

  it('should throw error if email is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        firstname: 'Murray',
        lastname: 'Kohler',
        password: 'dolapo2018@@',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if first name is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Hane@yahoo.com',
        firstname: '',
        lastname: 'Kohler',
        password: 'dolapo2018@@',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if last name is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Hane@yahoo.com',
        firstname: 'Murray',
        lastname: '',
        password: 'dolapo2018@@',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if password is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Hane@yahoo.com',
        firstname: 'Murray',
        lastname: 'Kohler',
        password: '',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if address is missing', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Hane@yahoo.com',
        firstname: 'Murray',
        lastname: 'Kohler',
        password: 'dolapo2018@@',
        address: '',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Haneyahoo.com',
        firstname: 'Murray',
        lastname: 'Kohler',
        password: 'dolapo2018@@',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if first name is not all aphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Hane@yahoo.com',
        firstname: 'Murray335',
        lastname: 'Kohler',
        password: 'dolapo2018@@',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if last name is not all alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Hane@yahoo.com',
        firstname: 'Murray',
        lastname: 'Kohler454',
        password: 'dolapo2018@@',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if password is less than 6 characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Hane@yahoo.com',
        firstname: 'Murray',
        lastname: 'Kohler',
        password: 'dola',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if password is less than 6 characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Sean.Hane@yahoo.com',
        firstname: 'Murray',
        lastname: 'Kohler',
        password: '',
        address: '9 gabriel olusanya',
        adminSecret: 'dappy'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should get default route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should get default route', (done) => {
    chai.request(app)
      .get('/dlkdl')
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
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

describe('Can authorize user to the app', () => {
  it('should allow user signin to app', (done) => {
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

  it('should throw an error is user does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Se.Hane@yahoo.com',
        password: 'dolapo2018@@',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should throw an error if email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: 'dolapo2018@@',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw an error if password is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Se.Hane@yahoo.com',
        password: '',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw an error if password is less than 6 characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Se.Hane@yahoo.com',
        password: 'dola',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw an error if password is incorrect', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Sean.Hane@yahoo.com',
        password: 'dolapo2018@@@',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should throw an error is user does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Se.Hane@yahoo.com',
        password: 'dolapo2018@@',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('car routes', () => {
  it('should create new car', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', adminUserToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image_url', fs.readFileSync('test/assets/auromart7.jpg'), 'auromart7.jpg')
      .field('state', 'new')
      .field('price', '3000000')
      .field('manufacturer', 'honda')
      .field('model', 'accord')
      .field('bodyType', 'car')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should throw error if state empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', adminUserToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image_url', fs.readFileSync('test/assets/auromart7.jpg'), 'auromart7.jpg')
      .field('state', 'jeep')
      .field('price', '3000000')
      .field('manufacturer', 'honda')
      .field('model', 'accord')
      .field('bodyType', 'car')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if state is not new or used', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', adminUserToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image_url', fs.readFileSync('test/assets/auromart7.jpg'), 'auromart7.jpg')
      .field('state', 'jeep')
      .field('price', '3000000')
      .field('manufacturer', 'honda')
      .field('model', 'accord')
      .field('bodyType', 'car')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if price is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', adminUserToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image_url', fs.readFileSync('test/assets/auromart7.jpg'), 'auromart7.jpg')
      .field('state', 'new')
      .field('price', '')
      .field('manufacturer', 'honda')
      .field('model', 'accord')
      .field('bodyType', 'car')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if manufacturer is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', adminUserToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image_url', fs.readFileSync('test/assets/auromart7.jpg'), 'auromart7.jpg')
      .field('state', 'new')
      .field('price', '3000000')
      .field('manufacturer', '')
      .field('model', 'accord')
      .field('bodyType', 'car')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if model is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', adminUserToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image_url', fs.readFileSync('test/assets/auromart7.jpg'), 'auromart7.jpg')
      .field('state', 'new')
      .field('price', '3000000')
      .field('manufacturer', 'honda')
      .field('model', '')
      .field('bodyType', 'car')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if body type is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', adminUserToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image_url', fs.readFileSync('test/assets/auromart7.jpg'), 'auromart7.jpg')
      .field('state', 'new')
      .field('price', '3000000')
      .field('manufacturer', 'honda')
      .field('model', 'accord')
      .field('bodyType', '')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if body type is not car not van', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', adminUserToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image_url', fs.readFileSync('test/assets/auromart7.jpg'), 'auromart7.jpg')
      .field('state', 'new')
      .field('price', '3000000')
      .field('manufacturer', 'honda')
      .field('model', 'accord')
      .field('bodyType', 'jam')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if body type is not car not van', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .attach('image_url', fs.readFileSync('test/assets/auromart7.jpg'), 'auromart7.jpg')
      .field('state', 'new')
      .field('price', '3000000')
      .field('manufacturer', 'honda')
      .field('model', 'accord')
      .field('bodyType', 'jam')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should update car status', (done) => {
    chai.request(app)
      .patch('/api/v1/car/76/status')
      .set('Authorization', adminUserToken)
      .send({
        status: 'sold',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should update car status', (done) => {
    chai.request(app)
      .patch('/api/v1/car/76/status')
      .set('Authorization', adminUserToken)
      .send({
        status: '',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should update car price', (done) => {
    chai.request(app)
      .patch('/api/v1/car/76/price')
      .set('Authorization', adminUserToken)
      .send({
        price: '800000',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should update car price', (done) => {
    chai.request(app)
      .patch('/api/v1/car/76/price')
      .set('Authorization', adminUserToken)
      .send({
        price: '',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should update car status', (done) => {
    chai.request(app)
      .patch('/api/v1/car/76/status')
      .set('Authorization', adminUserToken)
      .send({
        status: 'jeep',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should get one car', (done) => {
    chai.request(app)
      .get('/api/v1/car/76')
      .set('Authorization', adminUserToken)
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should create new order', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', adminUserToken)
      .send({
        carId: '6',
        priceOffered: '30000000'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should throw error if car does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', adminUserToken)
      .send({
        carId: '305',
        priceOffered: '30000000'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should throw error if car is not specified', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', adminUserToken)
      .send({
        carId: '',
        priceOffered: '30000000'
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if price is not specified', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', adminUserToken)
      .send({
        carId: '305',
        priceOffered: ''
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if price is not specified', (done) => {
    chai.request(app)
      .patch('/api/v1/order/26/price')
      .set('Authorization', adminUserToken)
      .send({
        newOffer: '40000000',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('create new flag', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', adminUserToken)
      .send({
        carId: '6',
        reason: 'bad tyres',
        description: 'really bad tyres',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('create new flag', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', adminUserToken)
      .send({
        carId: '700',
        reason: 'bad tyres',
        description: 'really bad tyres',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('throw error if car id not specified', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', adminUserToken)
      .send({
        carId: '',
        reason: 'bad tyres',
        description: 'really bad tyres',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('throw error if reason not specified', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', adminUserToken)
      .send({
        carId: '6',
        reason: '',
        description: 'really bad tyres',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('throw error if description not specified', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', adminUserToken)
      .send({
        carId: '6',
        reason: 'bad tyres',
        description: '',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('should throw error if price is not specified', (done) => {
    chai.request(app)
      .patch('/api/v1/order/500/price')
      .set('Authorization', adminUserToken)
      .send({
        newOffer: '40000000',
      })
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should get all cars', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', adminUserToken)
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should get all cars', (done) => {
    chai.request(app)
      .get('/api/v1/car/4')
      .set('Authorization', adminUserToken)
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should throw an error if id not found', (done) => {
    chai.request(app)
      .get('/api/v1/car/600')
      .set('Authorization', adminUserToken)
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should get all available cars', (done) => {
    chai.request(app)
      .get('/api/v1/car?status=available')
      .set('Authorization', adminUserToken)
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should get all available cars within price range', (done) => {
    chai.request(app)
      .get('/api/v1/car?status=available&min_price=3000000&max_price=5000000')
      .set('Authorization', adminUserToken)
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should throw error if cannot get available cars within price range', (done) => {
    chai.request(app)
      .get('/api/v1/car?status=available&min_price=1000000&max_price=2000000')
      .set('Authorization', adminUserToken)
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should throw error if user not admin', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', userToken)
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should throw error if id not found', (done) => {
    chai.request(app)
      .delete('/api/v1/car/600')
      .set('Authorization', adminUserToken)
      .end((err, res) => {
        if (err)done();
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });
});
