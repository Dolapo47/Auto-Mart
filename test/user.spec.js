import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../src/app';

dotenv.config();
const { expect } = chai;

chai.use(chaiHttp);
let adminUserToken;
let userToken;
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiZG9sYXBvIiwibGFzdG5hbWUiOiJhZGVsZXllIiwiZW1haWwiOiJkb2xhcG9AYW5kZWxhLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGd0emtNLjJqaExucnVXWkJhVFFybC5PU1pSekV0QjlwaHdKUWRXWDdPaTRvOTZwVzJpam9LIiwiYWRkcmVzcyI6IjEzMSBpamVzaGEgcm9hZCIsImlzX2FkbWluIjoiZiIsImlhdCI6MTU2MTM4NTY2Nn0.8T9lE2PcQn-NdPwLzU6m3eYfyvCcxB2VSo-iqX-gN2';

describe('Can register new user', () => {
  it('should allow user signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'dolapo',
        lastname: 'adeleye',
        email: 'dolapo@andela.com',
        password: 'dappy2018@@',
        adminsecret: 'dappy',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        adminUserToken = res.body.data.token;
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should allow user signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'ayomide',
        lastname: 'adeleye',
        email: 'ayomide@andela.com',
        password: 'dappy2018@@',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should throw error if user exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'dolapo',
        lastname: 'adeleye',
        email: 'dolapo@andela.com',
        password: 'dappy2018@@',
        adminsecret: 'dappy',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('should throw error if firstname empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: 'adeleye',
        email: 'dolapo@andela.com',
        password: 'dappy2018@@',
        adminsecret: 'dappy',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if lastname empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'dolapo',
        lastname: '',
        email: 'dolapo@andela.com',
        password: 'dappy2018@@',
        adminsecret: 'dappy',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if email empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'dolapo',
        lastname: 'adeleye',
        email: '',
        password: 'dappy2018@@',
        adminsecret: 'dappy',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if address empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'dolapo',
        lastname: 'adeleye',
        email: 'dappy@andela.com',
        password: 'dappy2018@@',
        adminsecret: 'dappy',
        address: ''
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if email is wrong format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'dolapo',
        lastname: 'adeleye',
        email: 'dappy.andela.com',
        password: 'dappy2018@@',
        adminsecret: 'dappy',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if is not alphabet', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'dolapo558',
        lastname: 'adeleye',
        email: 'dappy@g.com',
        password: 'dappy2018@@',
        adminsecret: 'dappy',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if last name is not alphabet', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'dolapo',
        lastname: 'adeleye48498',
        email: 'dappy@g.com',
        password: 'dappy2018@@',
        adminsecret: 'dappy',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if password less than 2', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'dolapo',
        lastname: 'adeleye48498',
        email: 'dappy@g.com',
        password: 'd',
        adminsecret: 'dappy',
        address: '131 ijesha road'
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if password less that 2', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dappy@g.com',
        password: 'd',
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if email wrong format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dappyg.com',
        password: 'dappy',
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if email empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: 'dappy',
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if password empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dappy@g.com',
        password: '',
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should throw error if user does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dola@andela.com',
        password: 'dappy2018@@',
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should login user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dolapo@andela.com',
        password: 'dappy2018@@',
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should login user', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should login user', (done) => {
    chai.request(app)
      .get('/fjfk')
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('JWT auth', () => {
  it('should throw error if token is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('token', invalidToken)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should throw error if user is not admin', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(401);
        done();
      });
  });
});
