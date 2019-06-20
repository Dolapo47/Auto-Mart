import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import orders from '../src/db/orderDb';

const { expect } = chai;
chai.use(chaiHttp);
