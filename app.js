const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

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

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }

    })
};

const getTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    //if(id > tours.length){
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }


    res.status(200).json({
        status: "success",
        data: {
            tour
        }

    })
};

const createTour = (req, res) => {

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data:{
                tour: newTour
            }
        })
    })

};

const updateTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    //if(id > tours.length){
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }


    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here...>'
        }

    })
};

const deleteTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    //if(id > tours.length){
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }


    res.status(204).json({
        status: "success",
        data: null

    })

    
}

const getAllUsers = (req, res) => {
    console.log(req.requestTime);
    res.status(500).json({
        status: "error",
        message: 'This rout is not yet defined'

    })
};

const createUser = (req, res) => {
    console.log(req.requestTime);
    res.status(500).json({
        status: "error",
        message: 'This rout is not yet defined'

    })
};


const getUser = (req, res) => {
    console.log(req.requestTime);
    res.status(500).json({
        status: "error",
        message: 'This rout is not yet defined'

    })
};

const updateUser = (req, res) => {
    console.log(req.requestTime);
    res.status(500).json({
        status: "error",
        message: 'This rout is not yet defined'

    })
};

const deleteUser = (req, res) => {
    console.log(req.requestTime);
    res.status(500).json({
        status: "error",
        message: 'This rout is not yet defined'

    })
};

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);   

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})