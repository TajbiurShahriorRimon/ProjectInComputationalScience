package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;

import com.ecommerce.entity.Category;

public interface CategoryService {

	public Category addCategory(Category category);
	
	public ArrayList<Category> getAllCategory();
	
	public List<Category> getAllCategories();
	
	public void manageCategory(int id);
	
	public List<Category> searchCategories(String key);

	public List<Object> countProductsByCategory();


}
