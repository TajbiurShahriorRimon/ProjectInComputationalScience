package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecommerce.entity.Category;

public interface CategoryDao extends JpaRepository<Category, Integer>{
	
	@Query(value = "SELECT * FROM category WHERE category_name LIKE %:key% ", nativeQuery = true)
	List<Category> search(String key);

}
