/* eslint-disable quotes */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../src/app';

const { expect } = chai;
chai.use(chaiHttp);


describe("POST api/v1/auth/signup", () => {
  it("Should throw an error if email already exists", (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'Dolapo@andela.com',
        first_name: 'dolapo',
        last_name: 'adeleye',
        password: 'Dolapo2018@@',
        address: '12 epic tower road lagos',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(409);
        expect(body.error).to.be.a('string');
        expect(body.error).to.be.equal('The user already exist');
        done();
      });
  });
});

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
        if (err) done(err);
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.equal(201);
        expect(body.success).to.be.equal('user registered');
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

  it('should return an error if sign in details doesnt exist', (done) => {
    const user = {
      email: 'dol@andela.com',
      password: 'dolapo2018@@',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a("number");
        expect(res.body.message).to.be.a("string");
        expect(res.body.message).to.be.equal("Auth Failed");
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("Should return an error if login inputs are invalid", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({ email: "dim@gmail.com", password: "Sweeum" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(res.status).to.be.a("number");
        expect(res.status).to.be.equal(400);
        done();
      });
  });

  it("Should return an error if signup inputs are invalid", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({ email: "dim@gmail.com", password: "Sweeum" })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an("object");
        expect(res.status).to.be.a("number");
        expect(res.status).to.be.equal(400);
        done();
      });
  });
});
