import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import winston from 'winston';
import '@babel/polyfill';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';
import user from './routes/user';
import vehicle from './routes/vehicle';
import order from './routes/order';
import flag from './routes/flag';
import { errorMessage } from './helper/validations/responseMessages';


const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));

const swaggerDocument = YAML.load(`${__dirname}/../swagger.yaml`);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(
  cors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
// cross origin resource sharing middleware
app.use(cors());


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
// app.use('/api/v1', vehicle);
// app.use('/api/v1', order);
// app.use('/api/v1', flag);


app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Route does not exist'
}));

app.use((err, req, res) => {
  if (err) return errorMessage(res, 500, 'internal server error');
});


app.listen(port, () => {
  winston.info(`Server is running on port ${port}`);
});

export default app;
