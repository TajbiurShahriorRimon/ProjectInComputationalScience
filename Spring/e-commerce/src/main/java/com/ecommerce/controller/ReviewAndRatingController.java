package com.ecommerce.controller;

import com.ecommerce.entity.ReviewAndRating;
import com.ecommerce.service.ReviewAndRatingService;
import com.mysql.cj.protocol.x.Ok;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import antlr.collections.List;

import java.util.ArrayList;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Null;

@RestController
public class ReviewAndRatingController {
   @Autowired
   private ReviewAndRatingService reviewAndRatingService;

   @Autowired
   private EntityManager entityManager;

   @GetMapping("/product/getReviewsAndRatings/{id}")
   public ResponseEntity<ArrayList<ReviewAndRating>> getReviewAndRating(@PathVariable int id /* Product Id */){
       return ResponseEntity.ok(reviewAndRatingService.getProductReivewAndRating(id));
   }

   @GetMapping("/reviewAndRating/{id}")
   public ResponseEntity<ReviewAndRating> get(@PathVariable int id){
       return ResponseEntity.ok(reviewAndRatingService.getReview(id));
   }

   @PostMapping(value="/reviewAndRating")
   public ResponseEntity<ReviewAndRating> add(@RequestBody ReviewAndRating reviewAndRating){
       // entityManager.createNativeQuery("INSERT into category (category_id) VALUES ("+5+")")
       // .executeUpdate();
       //var v = entityManager.createNativeQuery("Select * from review_and_rating").getResultList();

       //var x = reviewAndRatingService.addReviewAnddRating(reviewAndRating);
       //return ResponseEntity.ok(reviewAndRatingService.addReviewAnddRating(reviewAndRating));
       return new ResponseEntity<ReviewAndRating>(reviewAndRatingService.addReviewAnddRating(reviewAndRating), HttpStatus.CREATED);
   }

   @GetMapping(value = "/review/checkCustomerReviewForProduct/{productId}/{customerId}")
   public ResponseEntity<ReviewAndRating> checkIfCustomerReviewGiven(@PathVariable int productId, @PathVariable int customerId){
       ReviewAndRating reviewAndRating = reviewAndRatingService.checkUserReviewGiven(productId, customerId);
       if(reviewAndRating == null){
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }
       return new ResponseEntity<ReviewAndRating>(reviewAndRating, HttpStatus.OK);
   }
	
}
