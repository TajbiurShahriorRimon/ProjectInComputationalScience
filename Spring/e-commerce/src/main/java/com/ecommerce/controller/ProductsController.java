package com.ecommerce.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.ecommerce.entity.Products;
import com.ecommerce.entity.ReviewAndRating;
import com.ecommerce.service.ProductsService;
import com.ecommerce.service.ReviewAndRatingService;




@RestController
public class ProductsController {
	
	@Autowired
	private ProductsService productsService;
	
	@PostMapping(value="/addProducts",consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Products> addProducts(@Valid @RequestBody Products product) {
		System.out.println("Add entity");
		product= this.productsService.addProducts(product);
		return new ResponseEntity<Products>(product, HttpStatus.CREATED);
	}


	@GetMapping("/products")
	public ResponseEntity<ArrayList<Products>> getAllProducts(){
		return ResponseEntity.ok(productsService.getAllProducts()); }
	
	@GetMapping(value = "/products/{value}")
	public ResponseEntity<ArrayList<Products>> searchProducts(@PathVariable String value){
		return ResponseEntity.ok(productsService.searchProducts(value)); }
	
	@PostMapping(value="/addImage")
	public ResponseEntity<String> addImage(@RequestParam("file") MultipartFile file) {
		System.out.println("Add image");
		System.out.println(file.getOriginalFilename());
		productsService.saveImage(file);
		return new ResponseEntity("Working",HttpStatus.ACCEPTED); 

	}
	
	
	@PostMapping(value="/updateImage/{id}") //{MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<String> updateImage(@RequestParam("file") MultipartFile file,@PathVariable String id) {
		System.out.println("Update image");
		System.out.println(file.getOriginalFilename());
		productsService.updateImage(file, id);
		return new ResponseEntity("Working",HttpStatus.ACCEPTED); 

	}
	

//	@GetMapping("/products")
//	public ResponseEntity<Stream<Products>> getAllProducts(){
//		return ResponseEntity.ok(productsService.getAllProducts()); 
//	}

	@GetMapping("/product/{id}")
	public ResponseEntity<Products> getProduct(@PathVariable int id){
		var data = productsService.getProductById(id);
		if(data == null){
			//return new ResponseEntity<>(data, HttpStatus.NOT_FOUND);
			return new ResponseEntity<>(data, HttpStatus.NO_CONTENT);
		}
		return ResponseEntity.ok(productsService.getProductById(id));
	}

	@GetMapping("/product/vendor/{id}")
	public ResponseEntity<ArrayList<Products>> getProductsForVendor(@PathVariable int id /* Vendor Id */){
		return ResponseEntity.ok(productsService.getProductsVendor(id));
	}

	@GetMapping("/product/changeStatus/{id}")
	public ResponseEntity<Products> changeStatus(@PathVariable int id /* Product Id */){
		return new ResponseEntity<Products>(productsService.changeProductStatus(id), HttpStatus.OK);
	}

	@GetMapping(value = "/product/yearlySales/{id}")
    public ResponseEntity<List> yearlySales(@PathVariable int id /* Product Id */){
        return new ResponseEntity<List>(productsService.yearlyProductSales(id), HttpStatus.OK);
    }

	@GetMapping(value = "/product/monthlySales/{id}/{year}")
    public ResponseEntity<List> productSales(@PathVariable int id /* Product Id */, @PathVariable int year){
        return new ResponseEntity<List>(productsService.monthlyProductSales(id, year), HttpStatus.OK);
    }

	@GetMapping(value = "/product/dailySales/{year}/{month}/{productId}")
    public ResponseEntity<Object[][]> dailySales(@PathVariable int year, @PathVariable int month, @PathVariable int productId){
        int v = 12;
        return new ResponseEntity<Object[][]>(productsService.dailyProductSalesByYearMonth(year, month, productId), HttpStatus.OK);
    }
	
}
