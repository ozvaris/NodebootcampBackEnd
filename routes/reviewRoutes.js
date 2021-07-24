const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

//protects all routes after that middleware
router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getTourId, reviewController.getAllReviews)
  .post(
    authController.restrictTo('admin', 'user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('admin', 'user'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview
  );

module.exports = router;
