const Rating = require('../model/rating.model');
const Freelancer = require('../../freelancers/model/Freelancer');

const addReview = async (data) => {
  const review = await Review.create(data);

  // Auto-calculate average rating if target is a freelancer
  if (data.targetType === 'Freelancer') {
    const reviews = await Review.find({ targetId: data.targetId, targetType: 'Freelancer' });
    const avgRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;
    await Freelancer.findByIdAndUpdate(data.targetId, {
      averageRating: avgRating,
      reviewCount: reviews.length
    });
  }

  return review;
};

const getTargetReviews = async (targetId) => {
  return await Review.find({ targetId }).populate('userId', 'name profilePic');
};

module.exports = { addReview, getTargetReviews };
