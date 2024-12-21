package com.ecommerce.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Login;
import com.ecommerce.entity.User;
import com.ecommerce.security.JwtUtil;
import com.ecommerce.service.LoginService;

@RestController
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private AuthenticationManager auth;
	
	
	@Autowired
	private JwtUtil jwt;
	
	@PostMapping(value="/uLoginReg")
	public ResponseEntity<Login> addLogin(@Valid @RequestBody Login login ){
		login =this.loginService.addLogin(login);
		return new ResponseEntity<Login>(login, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/login1")
	public ResponseEntity<Login> verifyLogin(@RequestBody Login login) {
		System.out.println(login);
		login=loginService.verifyLogin(login,login.getMail(),login.getPassword());
		System.out.println(login);
		if(login==null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<Login>(login, HttpStatus.CREATED);
	}
//	@PostMapping(value="/login")
//	public ResponseEntity<?> generateToken(@RequestBody Login login){
//		System.out.println(login);
//	}
//	@PostMapping(value="/")
//	public String loginPage() {
//		return "/customer/index";
//	}
//	

	@PostMapping(value = "/changePassword/{email}")
	public ResponseEntity<Login> chengeUserPassword(@RequestBody Login login, @PathVariable String email){
		return new ResponseEntity<Login>(loginService.changePassword(login), HttpStatus.OK);
	}

}
