const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//1 - MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, resp, next) => {
  req.requestTime = new Date().toISOString();
  console.log('token :', req.headers.authorization);
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
