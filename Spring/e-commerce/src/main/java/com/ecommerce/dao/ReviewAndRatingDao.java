package com.ecommerce.dao;

import com.ecommerce.entity.ReviewAndRating;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewAndRatingDao extends JpaRepository<ReviewAndRating, Integer> {
    
}
