
package com.ecommerce.service;

import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.ecommerce.dao.ReviewAndRatingDao;
import com.ecommerce.entity.ReviewAndRating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import antlr.collections.List;
import net.bytebuddy.asm.Advice.Return;

@Service
public class ReviewAndRatingServiceImpl implements ReviewAndRatingService {

    @Autowired
    private ReviewAndRatingDao reviewAndRatingDao;

    @Autowired
    private EntityManager entityManager;

	@Override
    public ArrayList<ReviewAndRating> getProductReivewAndRating(int id){
        var reviewAndRating = reviewAndRatingDao.findAll()
        .stream().filter(x -> x.getProduct().getProductId() == id).collect(Collectors.toList());
        return (ArrayList<ReviewAndRating>) reviewAndRating;
    }

    @Override
    public ReviewAndRating getReview(int id) {
        var reviewAndRating = reviewAndRatingDao.findById(id).get();
        return reviewAndRating;
    }

    @Transactional
    @Override
    public ReviewAndRating addReviewAnddRating(ReviewAndRating reviewAndRating) {
        entityManager.createNativeQuery("INSERT into review_and_rating (rating, value, customer_id, product_product_id) VALUES (?, ?, ?, ?)")
        .setParameter(1, reviewAndRating.getRating())
        .setParameter(2, reviewAndRating.getValue())
        .setParameter(3, reviewAndRating.getCustomer().getId())
        .setParameter(4, reviewAndRating.getProduct().getProductId())
        .executeUpdate();

        return reviewAndRating;
    }

    @Override
    public ReviewAndRating checkUserReviewGiven(int productId, int customer_id){
        var review_and_rating = (ReviewAndRating) reviewAndRatingDao.findAll()
        .stream().filter(x -> x.getProduct().getProductId() == productId && x.getCustomer().getId() == customer_id).findFirst().orElse(null);
        return review_and_rating;
    }

}

