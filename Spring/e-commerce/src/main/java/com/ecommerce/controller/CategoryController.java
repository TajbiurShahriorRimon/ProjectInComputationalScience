package com.ecommerce.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Category;
import com.ecommerce.service.CategoryService;

@RestController
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping(value="/addCategory",consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Category> addProducts(@Valid @RequestBody Category category) {
		category= this.categoryService.addCategory(category);
		return new ResponseEntity<Category>(category, HttpStatus.CREATED);
	}
	
	@GetMapping("/category")
	public ResponseEntity<ArrayList<Category>> getAllCategory(){
		return ResponseEntity.ok(categoryService.getAllCategory()); }
	
	@GetMapping("/allCategory")
	public ResponseEntity<List<Category>> getAllCategories(){
		return ResponseEntity.ok(categoryService.getAllCategories()); }
	
	@GetMapping(value = "/searchCategory/{key}")
	public ResponseEntity<List<Category>> searchCategories(@PathVariable String key){
		return ResponseEntity.ok(categoryService.searchCategories(key)); }
	
	@PutMapping("/changeStatus/{id}")
	public ResponseEntity<Void> status(@PathVariable int id){
		this.categoryService.manageCategory(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/getCountProduct")
	public List getCountProduct(){
		return categoryService.countProductsByCategory();
	}

}
