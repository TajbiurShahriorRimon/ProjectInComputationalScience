package com.ecommerce.service;

import java.util.ArrayList;

import com.ecommerce.entity.ReviewAndRating;

public interface ReviewAndRatingService {
	public ArrayList<ReviewAndRating> getProductReivewAndRating(int id);
	public ReviewAndRating getReview(int id);
	public ReviewAndRating addReviewAnddRating(ReviewAndRating reviewAndRating);
	public ReviewAndRating checkUserReviewGiven(int productId, int customer_id);
}
