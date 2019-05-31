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

//   it('should delete a specific vehicle in the app', (done) => {
//     chai.request(app)
//       .delete('/api/v1/car/1')
//       .end((err, res) => {
//         const { body } = res;
//         if (err) done(err);
//         expect(body.status).to.equal(200);
//         done();
//       });
//   });
});
