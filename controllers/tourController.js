const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //BUIKD QUERY
    // 1A) Filtering
    const queryObj = { ...req.query };
    const exculededFields = ['page', 'sort', 'limit', 'fields'];
    exculededFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr), {
    //   price: 1,
    //   ratingsAverage: 2,
    //   createdAt: 3,
    // });

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //EXECUTE QUERY
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    //console.log(err);
    res.status(404).json({
      status: 'fail',
      //message: "Invalid data sent",
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    //console.log(req.params.id);
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    //console.log(err);
    res.status(404).json({
      status: 'fail',
      message: 'Not Found',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    //const newTours = new Tour({})
    //newTours.save();

    //console.log(req.body);

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    //console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};
