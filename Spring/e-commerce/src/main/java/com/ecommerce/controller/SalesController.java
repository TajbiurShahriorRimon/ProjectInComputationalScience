package com.ecommerce.controller;

import com.ecommerce.entity.Sales;
import com.ecommerce.service.SalesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import antlr.collections.List;

import java.util.ArrayList;

@RestController
public class SalesController {
    @Autowired SalesService salesService;

    @PostMapping(value = "/sales")
    public ResponseEntity add(@RequestBody ArrayList<Sales> sales){
        salesService.addSales(sales);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/sales/getSalesByOrder/{id}")
    public ResponseEntity<ArrayList<Sales>> getSalesByOrder(@PathVariable int id /* Order Id */){
        return new ResponseEntity<ArrayList<Sales>>(salesService.getPendingOrderByIdSales(id), HttpStatus.OK);
    }

    @GetMapping(value = "/sales/getBySalesOrder/{id}")
    public ResponseEntity<ArrayList<Sales>> getSalesByCustomerId(@PathVariable int id /* Order Id */){
        return new ResponseEntity<ArrayList<Sales>>(salesService.getOrderByIdSales(id), HttpStatus.OK);
    }
}
