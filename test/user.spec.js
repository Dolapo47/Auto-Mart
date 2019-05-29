import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

const { expect } = chai;
chai.use(chaiHttp);

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

  it('should give an error when an unknown route is passed', (done) => {
    const user = {
      email: 'dolapo@andela.com',
      first_name: 'dolapo',
      last_name: 'adeleye',
      password: 'dolapo2018@@',
      address: '9 epic tower road'
    };
    chai.request(app)
      .post('/djdjkjd')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
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
        const { body } = res;
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(body.status).to.be.a('number');
        done();
      });
  });
});
