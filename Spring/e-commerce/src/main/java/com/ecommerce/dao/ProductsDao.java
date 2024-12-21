package com.ecommerce.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.entity.Products;

public interface ProductsDao extends JpaRepository<Products, Integer> {
	
//	@Query("select t from Products t order by t.id desc LIMIT 1")
//	public Products findLastRow();
	
	public Products findFirstByOrderByProductIdDesc();
	


}