import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import user from './routes/user';
import vehicle from './routes/vehicle';
import order from './routes/order';

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// });

app.get('/', (req, res) => {
  res.send('Welcome to AutoMart');
});

app.use('/api/v1', user);
app.use('/api/v1', vehicle);
app.use('/api/v1', order);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
