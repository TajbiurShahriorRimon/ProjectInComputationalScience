package com.ecommerce.dao;

import com.ecommerce.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerDao extends JpaRepository<Customer, Integer> {
    
}
