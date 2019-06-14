import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import vehicles from '../src/db/carDb';

const { expect } = chai;
chai.use(chaiHttp);

describe('Car', () => {
  it('should create new car in app', (done) => {
    const car = {
      state: 'used',
      status: 'available',
      price: 2000000,
      manufacturer: 'toyota',
      model: 'camry',
      bodyType: 'car',
    };
    chai.request(app)
      .post('/api/v1/car')
      .send(car)
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(res).to.be.an('object');
        expect(res.statusCode).to.equal(201);
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

  // it('should update the price of vehicle in the app', (done) => {
  //   chai.request(app)
  //     .patch('/api/v1/car/1/price')
  //     .end((err, res) => {
  //       const { body } = res.body;
  //       console.log('body displays here.......................................', body);
  //       if (err) done(err);
  //       expect(res).to.be.an('object');
  //       expect(body.status).to.equal(200);
  //       done();
  //     });
  // });

  // it('should update the status of vehicle in app', (done) => {
  //   chai.request(app)
  //     .patch('/api/v1/car/1/status')
  //     .end((err, res) => {
  //       const { body } = res.body;
  //       console.log('body displays here.......................................', body);
  //       if (err) done(err);
  //       expect(res).to.be.an('object');
  //       expect(body.status).to.equal(200);
  //       done();
  //     });
  // });

  it('it should return an error if no vehicle is found', (done) => {
    chai.request(app)
      .get('/api/v1/car/5')
      .send({})
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(body.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.a('number');
        done();
      });
  });

  it('should return an error if item not found', (done) => {
    const vehicle = {
      state: 'new',
      status: 'available',
      price: 1200000,
      manufacturer: 'honda',
      model: 'accord',
      bodyType: 'car',
    };
    vehicles.push((vehicle));
    chai.request(app)
      .delete('/api/v1/car/5')
      .end((err, res) => {
        expect(res.body.status).to.equal(404);
        done();
      });
  });

  it('should delete a vehicle from the app', (done) => {
    const vehicle = {
      state: 'new',
      status: 'available',
      price: 1200000,
      manufacturer: 'honda',
      model: 'accord',
      bodyType: 'car',
    };
    vehicles.push((vehicle));
    chai.request(app)
      .delete('/api/v1/car/3')
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        done();
      });
  });

  it('should return an error if get item not found', (done) => {
    const vehicle = {
      state: 'new',
      status: 'available',
      price: 1200000,
      manufacturer: 'honda',
      model: 'accord',
      bodyType: 'car',
    };
    vehicles.push((vehicle));
    chai.request(app)
      .get('/api/v1/car/5')
      .end((err, res) => {
        expect(res.body.status).to.equal(404);
        done();
      });
  });
  it('should send a 404 if id is not available', (done) => {
    chai.request(app)
      .delete('/api/v1/car/6')
      .end((err, res) => {
        expect(res.body.status).to.equal(404);
        done();
      });
  });
});
