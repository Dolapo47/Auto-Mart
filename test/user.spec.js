import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import bcrypt from 'bcryptjs';
import app from '../src/app';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /', () => {
  it('should direct to the home route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an('array');
        expect(body.data[0].message).to.be.a('string');
        expect(body.data[0].message).to.be.equal('welcome to automart');
        done();
      });
  });
});

describe('GET *', () => {
  it('Should throw a 404 error', (done) => {
    chai
      .request(app)
      .get('/error')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.a('string');
        done();
      });
  });
});

describe('User', () => {
  it('should register a user', (done) => {
    const user = {
      email: 'dolapo@andela.com',
      first_name: 'dolapo',
      last_name: 'adeleye',
      password: 'dolapo2018@@',
      address: '9 epic tower road'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(res.status).to.equal(201);
        expect(body.status).to.equal(201);
        done();
      });
  });

  it('should log in users to the app', (done) => {
    const user = {
      email: 'dolapo@andela.com',
      password: 'dolapo2018@@',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});
