package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import antlr.collections.List;

import java.io.IOException;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.ecommerce.dao.ProductsDao;
import com.ecommerce.dao.ReviewAndRatingDao;
import com.ecommerce.entity.Products;
import com.ecommerce.entity.ReviewAndRating;

@Service
public class ProductsServiceImpl implements  ProductsService{
	 
	@Autowired
	private ProductsDao productsDao;

	@Autowired
	private ReviewAndRatingDao reviewAndRatingDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public Products getProduct(int productId) {
		// TODO Auto-generated method stub
		return productsDao.getById(productId);
	}

	@Override
	public Products addProducts(Products product) {
		// TODO Auto-generated method stub
		product.setStatus("active");
		productsDao.save(product);
		return product;
	}

	@Override
	public Products getProductById(int id){
		//return productsDao.findById(id).get();
		try {
			Products product = productsDao.findById(id).get();
		} catch (Exception e) {
			return null;
		}
		Products product = productsDao.findById(id).get();
		return product;
	}

	@Override
	public ArrayList<Products> getAllProducts() {
		var products = (ArrayList<Products>) productsDao.findAll()
		.stream().filter(x -> x.getStatus().equals("active".toString())).collect(Collectors.toList());
		return products;
	}

	// @Override
    // public ArrayList<ReviewAndRating> getProductReivewAndRating(String id) {
    //     var reviewAndRating = (ArrayList<ReviewAndRating>) reviewAndRatingDao.findAll()
    //     .stream().filter(x -> x.getProduct().getProductId().equals(id)).collect(Collectors.toList());
    //     return reviewAndRating;
    // }
	public Products saveImage(MultipartFile file)  {
		// TODO Auto-generated method stub
		
		
		try {
			
			return productsDao.save(productsDao.findFirstByOrderByProductIdDesc().setThumbnail(file.getBytes()));
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Transactional
	@Override
	public ArrayList<Products> searchProducts(String value) {
		// var products = (ArrayList<Products>) productsDao.findAll().stream().filter(x -> x.getProductName().contains(value)
		//  && x.getStatus().equals("active")).collect(Collectors.toList());
		var products = (ArrayList<Products>) entityManager.createNativeQuery("SELECT * FROM productsdummy2 WHERE product_name LIKE '%"+value+"%' and status = 'active'").getResultList();

		return products;
	}

	@Override
	public ArrayList<Products> getProductsVendor(int id) {
		var products = (ArrayList<Products>) productsDao.findAll()
		.stream().filter(x -> x.getVendor().getId() == id).collect(Collectors.toList());
		if(products == null){
			return null;
		}
		return products;
	}

	@Override
	public Products changeProductStatus(int id) {
		var product = productsDao.findById(id).get();
		if(product.getStatus().equals("active")){
			product.setStatus("inactive");
		}
		else{
			product.setStatus("active");
		}
		productsDao.save(product);
		return product;
	}

	@Transactional
	@Override
	public java.util.List<Object> yearlyProductSales(int id) {
		var data = entityManager.createNativeQuery("SELECT SUM(sales.price * sales.unit), year(STR_TO_DATE(date, '%d/%M/%Y')) FROM orders, sales "+
		"WHERE sales.order_id = orders.id AND sales.product_product_id = ? "+
		"AND orders.status = 'delivered' GROUP by year(STR_TO_DATE(orders.date, '%d/%M/%Y'))")
		.setParameter(1, id)
		.getResultList();
		return data;
	}

	@Transactional
	@Override
	public java.util.List<Object> monthlyProductSales(int productId, int year) {
		var data = entityManager.createNativeQuery("SELECT SUM(sales.price * sales.unit), Date_Format(STR_TO_DATE(date, '%d/%M/%Y'), '%M') AS month, "+ 
		"month(Str_To_Date(date, '%d/%M/%Y')) as monthStr FROM orders, sales " +
		"WHERE sales.order_id = orders.id AND sales.product_product_id = ? AND orders.status = 'delivered' " +
		"AND year(STR_TO_DATE(date, '%d/%M/%Y')) = ? GROUP BY month(STR_TO_DATE(date, '%d/%M/%Y'))")
		.setParameter(1, productId)
		.setParameter(2, year)
		.getResultList();
		return data;
	}

	@Override
	public Products updateImage(MultipartFile file, String productId) {
		// TODO Auto-generated method stub
		try {
			Products product=productsDao.findById(Integer.parseInt(productId)).get();
			return productsDao.save(product.setThumbnail(file.getBytes()));
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Transactional
	@Override
	public Object[][] dailyProductSalesByYearMonth(int year, int month, int productId) {
		var numOfDays = entityManager.createNativeQuery("SELECT DAY(LAST_DAY(STR_TO_DATE(date, '%d/%M/%Y'))) FROM orders "+
        "WHERE year(STR_TO_DATE(date, '%d/%M/%Y')) = ? AND month(STR_TO_DATE(date, '%d/%M/%Y')) = ? ")
        .setParameter(1, year)
        .setParameter(2, month)
        .getResultList();
        int lastDay = 0;
        for (Object object : numOfDays) {
            lastDay = (int) object;
            break;
        }
        int lastDayOfMonth = lastDay;

		var data = entityManager.createNativeQuery("SELECT SUM(sales.price * sales.unit), day(STR_TO_DATE(date, '%d/%M/%Y')) AS day "+
		"FROM orders, sales WHERE sales.order_id = orders.id "+
		"AND sales.product_product_id = ? AND orders.status = 'delivered' AND year(STR_TO_DATE(date, '%d/%M/%Y')) = ? "+
		"and month(STR_TO_DATE(date, '%d/%M/%Y')) = ? GROUP BY day(STR_TO_DATE(date, '%d/%M/%Y'))")
        .setParameter(1, productId)
        .setParameter(2, year)
        .setParameter(3, month)
        .getResultList();

        Object [][] ara = new Object[lastDayOfMonth][2];

        int j = 0;

        for(int i = 0; i < lastDayOfMonth; i++){
            if(j < data.size()){
                Object[] s = (Object[]) data.get(j);
                if(s[1].equals(i+1)){
                    ara[i][0] = (double) s[0];
                    ara[i][1] = (int) s[1];
                    j++;
                }
                else{
                    ara[i][0] = 0;
                    ara[i][1] = i+1;
                }
            }
            // try {
            //     Object l = (Double) s[0];
            // } catch (Exception e) {
            //     int u = 0;
            // }
            
            //Object m = (int) s[1];
            // if(s[1].equals(i+1)){
            //     ara[i][0] = (double) s[0];
            //     ara[i][1] = (int) s[1];
            //     j++;
            // }
            else{
                ara[i][0] = 0;
                ara[i][1] = i+1;
            }
        }
        return ara;
	}

}
