package com.ecommerce.dao;

import com.ecommerce.entity.Orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrdersDao extends JpaRepository<Orders, Integer> {
	
	@Query(value = "SELECT SUM(total_price) FROM `orders` WHERE status='delivered' AND date=DATE_FORMAT(curdate(), '%d/%M/%Y') ", nativeQuery = true)
	double todaysSale();
	
	@Query(value = "SELECT SUM(total_price) FROM `orders` WHERE status='delivered' ", nativeQuery = true)
	double totalSale();
    
}
