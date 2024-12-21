package com.ecommerce.service;

import java.util.ArrayList;
import java.util.stream.Stream;
import java.util.List;

import com.ecommerce.entity.Products;
import com.ecommerce.entity.ReviewAndRating;

import org.springframework.data.jpa.repository.Query;
import org.springframework.web.multipart.MultipartFile;


public interface ProductsService {
	
	public Products getProduct(int productId);

	public Products addProducts(Products product);

	public Products getProductById(int id);

	public ArrayList<Products> getAllProducts();
	
	public Products saveImage(MultipartFile file);
	
	public Products updateImage(MultipartFile file, String productId);
	
	public ArrayList<Products> searchProducts(String value);
	
	public ArrayList<Products> getProductsVendor(int id);

	public Products changeProductStatus(int id);

	public List<Object> yearlyProductSales(int id /* Product Id */);

	public List<Object> monthlyProductSales(int productId, int year);

	public Object[][] dailyProductSalesByYearMonth(int year, int month, int productId);

}
