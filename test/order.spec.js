import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import orders from '../src/db/orderDb';

const { expect } = chai;
chai.use(chaiHttp);

describe('Order', () => {
  it('should create new order', (done) => {
    const order = {
      userId: 3,
      carId: 2,
      status: 'accepted',
      amount: 1200000.00,
      amount_offered: 1100000.00,
    };
    orders.push(order);
    chai.request(app)
      .post('/api/v1/order')
      .end((err, res) => {
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.be.equal('order successfully created');
        done();
      });
  });

  it('should update price if order is pending', (done) => {
    chai.request(app)
      .patch('/api/v1/order/2/price')
      .send({
        amount_offered: 7000000
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal('Order price updated');
        done();
      });
  });

  it('should return an error if order does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/order/8/price')
      .send({
        amount_offered: 7000000
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.error).to.be.equal('internal server error');
        done();
      });
  });
});
