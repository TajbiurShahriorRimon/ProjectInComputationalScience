package com.ecommerce.controller;



import java.net.http.HttpRequest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import com.ecommerce.entity.User;
import com.ecommerce.entity.Vendor;
import com.ecommerce.service.VendorService;
import com.ecommerce.service.VendorServiceImpl;

@RestController
public class VendorController {
	
	@Autowired
	private VendorService vendorService;
	
	
	
	@PostMapping(value="/uVendorReg",consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Vendor> addVendor(@Valid @RequestBody Vendor vendor) {
		
		System.out.println("Vendor");
		System.out.println(vendor);
		vendor=this.vendorService.addVendor(vendor);
		
		return new ResponseEntity<Vendor> (vendor,HttpStatus.CREATED);
	}
	
//	@PostMapping(value="/getVendor")
//	public ResponseEntity<Vendor> getVendor( @RequestBody String userMail) {
//		
//		System.out.println(userMail);
//		Matcher m = Pattern.compile("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+").matcher(userMail);
//		while (m.find()) {
//			userMail=m.group();
//	        System.out.println(m.group());
//	    }
//		Vendor vendor =this.vendorService.getVendor(userMail);
//		return new ResponseEntity<Vendor> (vendor,HttpStatus.CREATED);
//	}
	
	@PostMapping(value="/getVendorIdByUserMail")
	public ResponseEntity<Vendor> getVendorId( @RequestBody String userMail) {
		
		System.out.println(userMail);
		Matcher m = Pattern.compile("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+").matcher(userMail);
		while (m.find()) {
			userMail=m.group();
	        System.out.println(m.group());
	    }
		int id =this.vendorService.getVendorIdByUserMail(userMail);
		Vendor vendor=this.vendorService.getVendor(id);
		System.out.println(vendor);
		return  ResponseEntity.ok(vendor);
	}
	
//	@PostMapping(value="/uVendorReg")
//	public String addVendor(String id){
//		
//		System.out.println("Vendor");
////		System.out.println(vendor);
////		vendor=this.vendorService.addVendor(vendor);
//		
//		return "id";
//	}

	@GetMapping(value = "/vendor/getVendorIdByEmail/{email}")
	public ResponseEntity<Integer> getVendorIdByEmail(@PathVariable String email){
		return new ResponseEntity<Integer>(vendorService.getVendorIdByEmail(email), HttpStatus.OK);
	}

	@GetMapping(value = "/vendor/get/{id}")
	public ResponseEntity<Vendor> get(@PathVariable int id){
		return new ResponseEntity<Vendor>(vendorService.getVendor(id), HttpStatus.OK);
	}

	@PostMapping(value="/vendor/update",consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Vendor> update(@Valid @RequestBody Vendor vendor) {
		return new ResponseEntity<Vendor>(vendorService.updateVendor(vendor), HttpStatus.CREATED);
	}

}
