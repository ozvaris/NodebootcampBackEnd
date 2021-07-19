const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//Set security HTT headers
app.use(helmet());

//1 - MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(express.static(`${__dirname}/public`));

app.use((req, resp, next) => {
  req.requestTime = new Date().toISOString();
  //console.log('token :', req.headers.authorization);
  next();
});

// app.get('/', (req, res) => {
//     //res.status(200).send('Herllo from the server side!');
//     res.status(404).json({message: 'Herllo from the server side!', app: 'nat'});
// })

// app.post('/', (req, res) => {
//     res.send("You can send this end found")
// })

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, resp, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
