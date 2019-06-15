/* eslint-disable quotes */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../src/app';
import orders from '../src/db/orderDb';
import vehicles from '../src/db/carDb';

const { expect } = chai;
chai.use(chaiHttp);

let userToken;
let UnAuthorizedUserToken;
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
