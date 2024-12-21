package com.ecommerce.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Login;
import com.ecommerce.security.JwtUtil;
import com.ecommerce.service.LoginService;
import com.ecommerce.service.LoginServiceImpl;
import com.ecommerce.service.UserService;

@RestController
public class AuthenticationController {
	
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private LoginServiceImpl loginService;
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> generateToken(@RequestBody Login login)throws Exception{
		
		System.out.println(login);
		
		if(userService.userIsActive(login.getMail())) {
			try {
				
				this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getMail(),login.getPassword()));
				
			} catch (UsernameNotFoundException e) {
				e.printStackTrace();
				throw new Exception("Invalid credentials");
			}
			
			UserDetails userDetails= this.loginService.loadUserByUsername(login.getMail());
			String token=this.jwtUtil.generateToken(userDetails);
			System.out.println("JWT "+token);
			
			 Map<Object, Object> response = new HashMap<>();
	         response.put("token", token);
	         response.put("mail",login.getMail());
	
	         return new ResponseEntity<>(response, HttpStatus.OK);
		}else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Registration not complete");

	}
	@PostMapping("/tokenValidation")
	public ResponseEntity<?> authenticateToken(String empty){
		return ResponseEntity.ok("OK");
	}

}
