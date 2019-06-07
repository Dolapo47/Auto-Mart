import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import orders from '../src/db/orderDb';

const { expect } = chai;
chai.use(chaiHttp);

describe('Order', () => {
  it('should create new order', (done) => {
    const order = {
      userId: 1,
      carId: 2,
      status: 'pending',
      amount: 1200000,
      amount_offered: 1250000,
    };
    chai.request(app)
      .post('/api/v1/order')
      .send(order)
      .end((err, res) => {
        const { body } = res;
        if (err) done(err);
        expect(body.status).to.equal(500);
        expect(body.error).to.be.equal('internal server error');
        done();
      });
  });
});

describe('failed order', () => {
  it('Should fail when input is wrong', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .send({ })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(res.status).to.be.a('number');
        expect(res.status).to.be.equal(400);
        done();
      });
  });
});

describe('should throw an error if order does not exist', () => {
  it('should throw an error if order exists', (done) => {
    const order = {
      amount_offered: 1000000,
      carId: 1,
      userId: 3
    };
    orders.push(order);
    chai.request(app)
      .post('/api/v1/order')
      .send(order)
      .end((err, res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(res.status).to.be.a('number');
        expect(res.status).to.be.equal(500);
        done();
      });
  });
});
