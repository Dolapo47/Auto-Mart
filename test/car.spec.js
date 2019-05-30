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
});
