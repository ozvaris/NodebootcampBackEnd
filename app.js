const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


const app = express();
//1 - MIDDLEWARE
app.use(morgan('dev'));

app.use(express.json());



app.use((req, resp, next) => {
    console.log('Hello from the middleware ');
    next();
})

app.use((req, resp, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// app.get('/', (req, res) => {
//     //res.status(200).send('Herllo from the server side!');
//     res.status(404).json({message: 'Herllo from the server side!', app: 'nat'});
// })

// app.post('/', (req, res) => {
//     res.send("You can send this end found")
// })

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;