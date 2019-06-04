import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

const { expect } = chai;
chai.use(chaiHttp);

describe('Car', () => {
  it('should create a new vehicle item', (done) => {
    const vehicle = {
      state: 'new',
      status: 'available',
      price: 1200000,
      manufacturer: 'honda',
      model: 'accord',
      bodyType: 'car',
    };
    chai.request(app)
      .post('/api/v1/car')
      .send(vehicle)
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(body).to.be.an('object');
        expect(body.status).to.equal(201);
        done();
      });
  });
  it('should get all cars in the app', (done) => {
    chai.request(app)
      .get('/api/v1/car')
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(body).to.be.an('object');
        expect(body.status).to.equal(200);
        done();
      });
  });

  it('should get specific car in the app', (done) => {
    chai.request(app)
      .get('/api/v1/car/1')
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(body).to.be.an('object');
        expect(body.status).to.equal(200);
        done();
      });
  });

  it('should update the price of vehicle in the app', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1/price')
      .send({ price: 2000000 })
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(body.status).to.equal(200);
        done();
      });
  });

  it('should update the status of vehicle in app', (done) => {
    chai.request(app)
      .patch('/api/v1/car/1/status')
      .send({ status: 'sold' })
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(body.status).to.equal(200);
        done();
      });
  });

  it('it should return an error if no vehicle is found', (done) => {
    chai.request(app)
      .get('/api/v1/car/5')
      .send({})
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(body.status).to.equal(404);
        expect(res.body.message).to.be.equal('No vehicle matched the specified criteria');
        expect(res.body.message).to.be.an('string');
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.a('number');
        done();
      });
  });
});
