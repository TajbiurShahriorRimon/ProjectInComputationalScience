package com.ecommerce.controller;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

//import java.sql.DriverManager;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.User;
import com.ecommerce.entity.Vendor;
import com.ecommerce.service.CustomerService;
import com.ecommerce.service.UserService;
import com.ecommerce.service.VendorService;

@RestController
public class UserController {
	
	
		@Autowired
		private UserService userservice;
		@Autowired
		private CustomerService customerService;
		
		
//		@GetMapping("/userHome/{userId}")
//		public User userHome(@PathVariable String userId) {
//			return this.getUser(userId);
//		}
		
		
		
		@PostMapping(value="/uReg",consumes=MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<User> addUser(@Valid @RequestBody User user) {
			if(!this.userservice.userExists(user.getMail())) {
				user= this.userservice.addUser(user);
				if(user.getType().equals("customer")) {
					customerService.addCustomer(user);
				}
			}else {
				return new ResponseEntity<>(HttpStatus.CONFLICT);
			}
			/*if(user.getType().equals("vendor")) {
				user=this.vendorservice.addVendor((Vendor)user);
			}*/
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		}

		@PostMapping("/getUser")
		public ResponseEntity<User> getUser(@RequestBody String email){
			
//			String[] email2=email.split("=");
//			System.out.println(email2[0]);
			email=email.replace("%40", "@");
			System.out.println(email);
			Matcher m = Pattern.compile("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+").matcher(email);
			while (m.find()) {
				email=m.group();
		        System.out.println(m.group());
		    }
			//email=m.group();
			return ResponseEntity.ok(this.userservice.getUser(email));
			//return email;
		}
		
		@GetMapping(value = "/user/getUserDataForSession/{email}")
		public ResponseEntity<User> getUserDataById(@PathVariable String email){
			return new ResponseEntity<User>(userservice.getUserDataForSession(email), HttpStatus.OK);
		}

		@GetMapping("/user/{email}")
		public ResponseEntity<User> get(@PathVariable String email){
			return ResponseEntity.ok(this.userservice.getUser(email));
		}
		
		@GetMapping("/allUsers")
		public ResponseEntity<List<User>> getAllUsers(){
			return ResponseEntity.ok(userservice.getAllUsers()); }
		
		@PutMapping("/changeUserStatus/{mail}")
		public ResponseEntity<Void> status(@PathVariable String mail){
			this.userservice.manageUser(mail);
			return new ResponseEntity<>(HttpStatus.OK);
		}

		// @PostMapping(value="/user/update/{userEmail}",consumes=MediaType.APPLICATION_JSON_VALUE)
		// public ResponseEntity<User> update(@Valid @RequestBody User user, @PathVariable String userEmail) {
		// 	// if(!this.userservice.userExists(userEmail)) {
		// 	// 	user= this.userservice.addUser(user);
		// 	// }else {
		// 	// 	return new ResponseEntity<>(HttpStatus.CONFLICT);
		// 	// }
		// 	User user2 = userservice.updateUser(user, userEmail);
		// 	if(user2 == null){
		// 		return new ResponseEntity<>(HttpStatus.CONFLICT);
		// 	}
		// 	return new ResponseEntity<User>(user, HttpStatus.CREATED);
		// }

		@PostMapping(value="/user/update",consumes=MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<User> update(@Valid @RequestBody User user) {
			userservice.updateUser(user);
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		}
		
		@GetMapping(value = "/searchUser/{key}")
		public ResponseEntity<List<User>> searchCategories(@PathVariable String key){
			return ResponseEntity.ok(userservice.searchUser(key)); }
		
		@GetMapping(value = "/activeUser")
		public ResponseEntity<Integer> activeUser(){
			return ResponseEntity.ok(userservice.activeUser()); }
		
		@GetMapping(value = "/inActiveUser")
		public ResponseEntity<Integer> inActiveUser(){
			return ResponseEntity.ok(userservice.inActiveUser()); }

	}
