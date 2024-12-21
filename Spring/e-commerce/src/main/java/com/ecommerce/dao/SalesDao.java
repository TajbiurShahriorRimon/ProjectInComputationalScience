package com.ecommerce.dao;

import com.ecommerce.entity.Sales;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesDao extends JpaRepository<Sales, Integer> {
    
}
