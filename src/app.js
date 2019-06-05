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
  res.status(200).json({
    status: 200,
    data: [
      {
        message: 'welcome to automart',
      }
    ]
  });
});

app.use('/api/v1', user);
app.use('/api/v1', vehicle);
app.use('/api/v1', order);


app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      status: 500,
      error: 'internal server error'
    });
  }
  return next();
});

app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Route does not exist'
}));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
