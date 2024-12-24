package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Orders;

@RestController
public class PaymentController {
    @Value("$(stripe.apikey)")
    String stripeKey;
    
    @PostMapping(value = "/payment")
    public String add(@RequestBody Long value) {        
        return stripeKey;
    }
    
}
