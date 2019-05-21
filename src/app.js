import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import user from './routes/user';
import vehicle from './routes/vehicle';

const app = express();
morgan('dev');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/api/v1', user);
app.use('/api/v1', vehicle);

app.get('/', (req, res) => {
  res.send('Welcome to AutoMart');
});


app.get('*', (req, res) => {
  res.send('Route not found');
});


export default app;
