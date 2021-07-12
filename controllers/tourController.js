const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.lenght,
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
