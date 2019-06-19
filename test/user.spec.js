/* eslint-disable quotes */
import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

const { expect } = chai;
chai.use(chaiHttp);

let signUpUserToken;
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpJ9.eyJlbWFpbCI6ImF5b21pZGVAYW5kZWxhLmNvbSIsInVzZXJJZCI6MywiaWF0IjoxNTYwNTkyODM0LCJleHAiOjE1NjA1OTY0MzR9.mniSRDZFQ1Yco7wjaMHxvzRy-uQ9f8ymkpqdZUZMSb8';

describe('GET /', () => {
  it('should redirect to home route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an('array');
        expect(body.data[0].message).to.be.equal('welcome to automart');
        done();
      });
  });

  it('should throw an error if route not found *', (done) => {
    chai.request(app)
      .get('/bad')
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(404);
        expect(body.status).to.be.a('number');
        done();
      });
  });
});

describe('POST routes', () => {
  it('should create a user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dappy@andela.com',
        first_name: 'dolapo',
        last_name: 'adeleye',
        password: 'Dolapo2018@@',
        address: '12 epic tower road lagos',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        signUpUserToken = body.data[0].token;
        expect(body.status).to.be.equals(201);
        expect(signUpUserToken).to.be.a('string');
        done();
      });
  });

  it('should give an error if password not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dappy@andela.com',
        first_name: 'dolapo',
        last_name: 'adeleye',
        password: '',
        address: '12 epic tower road lagos',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        done();
      });
  });

  it('should give an error if first name is not alphabet', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dappy@andela.com',
        first_name: 'dola22po',
        last_name: 'adeleye',
        password: 'Dolapo2018@@',
        address: '12 epic tower road lagos',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        done();
      });
  });

  it('should give an error if password not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dappy@andela.com',
        first_name: 'dolapo',
        last_name: 'a',
        password: 'Dolapo2018@@',
        address: '12 epic tower road lagos',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        done();
      });
  });

  it('should give an error if last name is not alphabet', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dappy@andela.com',
        first_name: 'dolapo',
        last_name: 'ad22-eleye',
        password: 'Dolapo2018@@',
        address: '12 epic tower road lagos',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        done();
      });
  });

  it('should give an error if first name is less than 2', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dappy@andela.com',
        first_name: 'd',
        last_name: 'adeleye',
        password: 'Dolapo2018@@',
        address: '12 epic tower road lagos',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        done();
      });
  });

  it('should give an error if address is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dappy@andela.com',
        first_name: 'dolapo',
        last_name: 'adeleye',
        password: 'Dolapo2018@@',
        address: '',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        done();
      });
  });

  it('should create an error if user exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dolapo@andela.com',
        first_name: 'dolapo',
        last_name: 'adeleye',
        password: 'Dolapo2018@@',
        address: '12 epic tower road lagos',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(409);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('should create an error if email input is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dolapoandela.com',
        first_name: 'dolapo',
        last_name: 'adeleye',
        password: 'Dolapo2018@@',
        address: '12 epic tower road lagos',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('should create an error if signup input is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dolapoandela.com',
        first_name: 'dolllapo',
        last_name: 'adeleye',
        password: 'Dolapo2018@@',
        address: '12 epic tower road lagos',
        isAdmin: true,
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        expect(body.status).to.be.a('number');
        done();
      });
  });
});

describe('JWT Auth', () => {
  it('should return status code 401 if token is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', invalidToken)
      .set('enctype', 'multipart/form-data')
      .type('form')
      .attach('photo', fs.readFileSync('./test/assets/auromart7.jpg'), 'auromart.jpg')
      .send({
        id: 3,
        email: "ayomide@andela.com",
        first_name: "Adedolapo",
        last_name: "Adeleye",
        password: "$2a$10$i8bQSQI7ZAOAClm0d88LUeoYA2Cmc9wivx5moS7z5.nDaI2.ZssMS",
        address: "9 gabriel olusanya lagos",
        admin: false
      })
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(401);
        done();
      });
  });

  it('should return status code 401 if token is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .send({
        id: 3,
        email: "ayomide@andela.com",
        first_name: "Adedolapo",
        last_name: "Adeleye",
        password: "$2a$10$i8bQSQI7ZAOAClm0d88LUeoYA2Cmc9wivx5moS7z5.nDaI2.ZssMS",
        address: "9 gabriel olusanya lagos",
        admin: false
      })
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.equals(401);
        done();
      });
  });
});

describe('User signin', () => {
  it('should login user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Dappy@andela.com',
        password: 'Dolapo2018@@',
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        signUpUserToken = body.data[0].token;
        expect(body.status).to.be.equals(200);
        expect(signUpUserToken).to.be.a('string');
        done();
      });
  });

  it('should give error if password is incorrect', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Dappy@andela.com',
        password: 'Dolapo2018@@@@',
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(401);
        done();
      });
  });

  it('should give error if email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: 'Dolapo2018@@@@',
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        done();
      });
  });

  it('should give error if password is incorrect', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Dappy@andela.com',
        password: 'Dolapo2018@@@@',
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(401);
        expect(signUpUserToken).to.be.a('string');
        done();
      });
  });

  it('should give error if password not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Dappy@andela.com',
        password: '',
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        done();
      });
  });

  it('should give an error if user does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Damilare@andela.com',
        password: 'Dolapo2018@@',
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(404);
        done();
      });
  });

  it('should create an error if signin input is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'Dolapoandela.com',
        password: 'Dolapo2018@@',
      })
      .end((err, res) => {
        if (err) done(err);
        const { body } = res;
        expect(body.status).to.be.equals(400);
        expect(body.status).to.be.a('number');
        done();
      });
  });
});

describe('Car routes', () => {
  it('Should create new car', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .set('enctype', 'multipart/form-data')
      .type('form')
      .attach('photo', fs.readFileSync('./test/assets/auromart7.jpg'), 'auromart.jpg')
      .send({
        userId: 2,
        state: 'new',
        price: 1200000,
        manufacturer: 'honda',
        model: 'accord',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        console.log(body);
        expect(body.status).to.be.equals(201);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should give 401 error if invalid token passed', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', invalidToken)
      .send({
        userId: 2,
        state: 'new',
        price: 1200000,
        manufacturer: 'honda',
        model: 'accord',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(401);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should give 401 error if no token passed', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .send({
        userId: 2,
        state: 'new',
        price: 1200000,
        manufacturer: 'honda',
        model: 'accord',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(401);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should successfully retrieve car', (done) => {
    chai.request(app)
      .get('/api/v1/car/2')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw an error if car not found', (done) => {
    chai.request(app)
      .get('/api/v1/car/12')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(404);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if car id not found', (done) => {
    chai.request(app)
      .delete('/api/v1/car/12')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(404);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should successfully get car', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if id is not number', (done) => {
    chai.request(app)
      .get('/api/v1/car/rr')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(404);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if id is not number', (done) => {
    chai.request(app)
      .delete('/api/v1/car/rr')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(404);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should successfully delete car', (done) => {
    chai.request(app)
      .delete('/api/v1/car/1')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });
});

describe('Car routes', () => {
  it('Should throw error if state not specified', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: '',
        price: 1200000,
        manufacturer: 'honda',
        model: 'accord',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if state is not new or used', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'gab',
        price: 1200000,
        manufacturer: 'honda',
        model: 'accord',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if state is not alphabet', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: '4646',
        price: 1200000,
        manufacturer: 'honda',
        model: 'accord',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if model is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: 1200000,
        manufacturer: 'honda',
        model: '',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if state is not alphabet', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: 1200000,
        manufacturer: 'honda',
        model: '=+',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if price is not number', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: 'dddj',
        manufacturer: 'honda',
        model: '=+',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if price is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: null,
        manufacturer: 'honda',
        model: '=+',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if manufacturer is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: null,
        manufacturer: '',
        model: '=+',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if manufacturer is more than 30', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: null,
        manufacturer: 'dkjdskjsksdkjdskjfkjfksgfjgkjsgdkjdgskjdsgkgdsjkgsdjkgsdjsgd',
        model: '=+',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if model is more than 30', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: null,
        manufacturer: 'honda',
        model: 'dkjdskjsksdkjdskjfkjfksgfjgkjsgdkjdgskjdsgkgdsjkgsdjkgsdjsgd',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if model is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: null,
        manufacturer: 'honda',
        model: '',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if body type is empty', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: null,
        manufacturer: 'honda',
        model: 'sdjhdjd',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if body type is more than 30 characters', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: null,
        manufacturer: 'honda',
        model: 'sdjhdjdkfkjdfkjfdkjfdkjfdfkjdfkhdfjfkjdfkfdkdfjkfd',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if body type is not alphabet', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: null,
        manufacturer: 'honda',
        model: 'sdjhdjd',
        bodyType: 'car2345',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if price is more than 12', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .send({
        userId: 2,
        state: 'new',
        price: 1763276272467244378734283583585385738753835,
        manufacturer: 'honda',
        model: 'accord',
        bodyType: 'car',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should update', (done) => {
    chai.request(app)
      .patch('/api/v1/car/3/status')
      .send({ userId: 3 })
      .end((err, res) => {
        const { body } = res;
        expect(body.success).to.be.equals('Vehicle successfully updated');
        expect(body.status).to.be.equal(200);
        done();
      });
  });

  it('Should update', (done) => {
    chai.request(app)
      .patch('/api/v1/car/3/price')
      .send({ price: 3000000 })
      .end((err, res) => {
        const { body } = res;
        expect(body.success).to.be.equals('Vehicle successfully updated');
        expect(body.status).to.be.equal(200);
        done();
      });
  });

  it('Should throw error if id not found', (done) => {
    chai.request(app)
      .patch('/api/v1/car/8/price')
      .set('Authorization', signUpUserToken)
      .send({ price: 3000000 })
      .end((err, res) => {
        const { body } = res;
        expect(body.error).to.be.equals('No vehicle matched the specified criteria');
        expect(body.status).to.be.equal(404);
        done();
      });
  });

  it('Should throw error if id not found', (done) => {
    chai.request(app)
      .patch('/api/v1/car/8/status')
      .set('Authorization', signUpUserToken)
      .send({ status: 'sold' })
      .end((err, res) => {
        const { body } = res;
        expect(body.error).to.be.equals('No vehicle matched the specified criteria');
        expect(body.status).to.be.equal(404);
        done();
      });
  });

  it('Should throw error if id is not number', (done) => {
    chai.request(app)
      .delete('/api/v1/car/3')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if id is not number', (done) => {
    chai.request(app)
      .delete('/api/v1/car/2')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('should get available car', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .query({ status: 'available' })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        done();
      });
  });

  it('should get available car', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .query({
        status: 'available',
        min_price: '1000000',
        max_price: '1200000',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        done();
      });
  });

  it('Should throw error if id is not number', (done) => {
    chai.request(app)
      .delete('/api/v1/car/4')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if vehicle db is empty', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(404);
        expect(body.status).to.be.a('number');
        done();
      });
  });
});

describe('Order Routes', () => {
  it('Should post order', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '5',
        amount: '1200000.00',
        amountOffered: '1400000.00',
        userId: 3
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(201);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error, order already exists', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '5',
        amount: '1200000.00',
        amountOffered: '1400000.00',
        userId: 3
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(409);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error car id is empty', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '',
        amount: '1200000.00',
        amountOffered: '1400000.00',
        userId: 3
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error amount is empty', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '',
        amount: '',
        amountOffered: '1400000.00',
        userId: 3
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error amount offered is empty', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '',
        amount: '1200000.00',
        amountOffered: '',
        userId: 3
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error amount offered is empty', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '',
        amount: '1200000',
        amountOffered: '1400000',
        userId: 3
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error amount offered is empty', (done) => {
    chai.request(app)
      .post('/api/v1/order')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '',
        amount: '1200000',
        amountOffered: '1400000',
        userId: 3
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });
});

describe('Order routes', () => {
  it('Should create order', (done) => {
    chai.request(app)
      .patch('/api/v1/order/3/price')
      .set('Authorization', signUpUserToken)
      .send({
        amountOffered: '5000000.00',
        userId: '1'
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if id not found', (done) => {
    chai.request(app)
      .patch('/api/v1/order/65/price')
      .set('Authorization', signUpUserToken)
      .send({
        amountOffered: '5000000.00',
        userId: '1'
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(409);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if userId not found', (done) => {
    chai.request(app)
      .patch('/api/v1/order/65/price')
      .set('Authorization', signUpUserToken)
      .send({
        amountOffered: '5000000.00',
        userId: ''
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if amount offered not found', (done) => {
    chai.request(app)
      .patch('/api/v1/order/65/price')
      .set('Authorization', signUpUserToken)
      .send({
        amountOffered: '',
        userId: '1'
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if amount offered not decimal', (done) => {
    chai.request(app)
      .patch('/api/v1/order/65/price')
      .set('Authorization', signUpUserToken)
      .send({
        amountOffered: '5000000',
        userId: '1'
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should throw error if userId not integer', (done) => {
    chai.request(app)
      .patch('/api/v1/order/65/price')
      .set('Authorization', signUpUserToken)
      .send({
        amountOffered: '5000000.00',
        userId: '1.oo'
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });
});

describe('Get routes', () => {
  it('should get available car', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .query({ status: 'available' })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(404);
        done();
      });
  });

  it('should get available car', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('Authorization', signUpUserToken)
      .query({
        status: 'available',
        min_price: '100000000',
        max_price: '120000000',
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(404);
        done();
      });
  });
});

describe('flag routes', () => {
  it('Should create a new flag', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '3',
        reason: 'gkjgjgdfgjfg',
        description: 'fekhfdkhfdgkjhfdkhdhkdjdkfd'
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(201);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should not create if carId empty', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '',
        reason: 'gkjgjgdfgjfg',
        description: 'fekhfdkhfdgkjhfdkhdhkdjdkfd'
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should not create if reason empty', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '3',
        reason: '',
        description: 'fekhfdkhfdgkjhfdkhdhkdjdkfd'
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should not create if description empty', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '3',
        reason: 'gkjgjgdfgjfg',
        description: ''
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });

  it('Should not create if carid not number', (done) => {
    chai.request(app)
      .post('/api/v1/flag')
      .set('Authorization', signUpUserToken)
      .send({
        carId: '3flfd',
        reason: 'gkjgjgdfgjfg',
        description: 'fekhfdkhfdgkjhfdkhdhkdjdkfd'
      })
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(422);
        expect(body.status).to.be.a('number');
        done();
      });
  });
});
