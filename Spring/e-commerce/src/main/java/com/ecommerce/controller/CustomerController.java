package com.ecommerce.controller;

import com.ecommerce.dao.CustomerDao;
import com.ecommerce.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping(value = "/customer/getCustomerIdByEmail/{email}")
    public ResponseEntity<Integer> getCustomerIdByEmail(@PathVariable String email){
        return new ResponseEntity<Integer>(customerService.getCustomerIdByEmail(email), HttpStatus.OK);
    }
    
}
