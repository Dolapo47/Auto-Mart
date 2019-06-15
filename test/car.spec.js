import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import vehicles from '../src/db/carDb';

const { expect } = chai;
chai.use(chaiHttp);
