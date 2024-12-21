package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dao.CategoryDao;
import com.ecommerce.dao.ProductsDao;
import com.ecommerce.entity.Category;
import com.ecommerce.entity.Products;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private EntityManager entityManager;



	@Override
	public Category addCategory(Category category) {
		// TODO Auto-generated method stub
		categoryDao.save(category);
		return category;
	}
	
	@Override
	public ArrayList<Category> getAllCategory() {
		var category = (ArrayList<Category>) categoryDao.findAll()
		.stream().filter(x -> x.getStatus().equals("active".toString())).collect(Collectors.toList());
		return category;
	}

	@Override
	public List<Category> getAllCategories() {
		// TODO Auto-generated method stub
		return categoryDao.findAll();
	}

	@Override
	public void manageCategory(int id) {
		Category entity = categoryDao.getById(id);
		if(entity.getStatus().equals("active")) {
			entity.setStatus("inactive");
			categoryDao.save(entity);
		}else {
			entity.setStatus("active");
			categoryDao.save(entity);
		}

	}
	
	@Override
	public List<Category> searchCategories(String key) {

		return categoryDao.search(key);

	}

	@Transactional
	@Override
	public List<Object> countProductsByCategory() {
		var data = entityManager.createNativeQuery("SELECT COUNT(productsdummy2.product_id), category.category_name FROM category," +
		 "productsdummy2 WHERE productsdummy2.category_category_id = category.category_id GROUP BY category.category_id")
		.getResultList();
		return data;
	}

	

}
