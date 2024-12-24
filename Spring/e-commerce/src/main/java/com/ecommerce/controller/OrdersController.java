package com.ecommerce.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.ecommerce.entity.Orders;
import com.ecommerce.entity.Sales;
import com.ecommerce.service.OrdersService;
import com.ecommerce.service.SalesService;
import com.mysql.cj.x.protobuf.MysqlxCrud.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrdersController {
    @Autowired
    private OrdersService ordersService;

    @PostMapping(value = "/order")
    public ResponseEntity<Integer> add(@RequestBody Orders orders){
        Orders order = ordersService.addOrder(orders);
        return new ResponseEntity<Integer>(order.getId(), HttpStatus.CREATED);
    }

    @GetMapping(value = "/order/checkSold/{productId}/{customerId}")
    public List checkIfCustomerReviewGiven(@PathVariable int productId, @PathVariable int customerId){
        var v = ordersService.checkIfCustomerPurchasedProduct(productId, customerId);
        return v;
    }

    @GetMapping(value = "/order/getPedingOrders")
    public ArrayList<Orders> getAllPendingOrders(){
        return ordersService.getPendingOrders();
    }

    @GetMapping(value = "/order/changeDeliveryStauts/{id}")
    public ResponseEntity<Boolean> changeDeiliveryStatus(@PathVariable int id){
        return new ResponseEntity<Boolean>(ordersService.setDeliverdStatus(id), HttpStatus.OK);
    }

    @GetMapping(value = "/order/changeCancelStatus/{id}")
    public ResponseEntity<Boolean> changeCancelStatus(@PathVariable int id){
        return new ResponseEntity<Boolean>(ordersService.setCancelStatus(id), HttpStatus.OK);
    }

    @GetMapping(value = "/order/customer/{id}")
    public ResponseEntity<ArrayList<Orders>> getOrdersCustomerById(@PathVariable int id /* Customer Id */){
        return new ResponseEntity<>(ordersService.getAllOrdersCustomerById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/order/get")
    public ResponseEntity<ArrayList<Orders>> get(){
        return new ResponseEntity<>(ordersService.getAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/order/yearlySales")
    public ResponseEntity<List> yearlyProductSales(){
        return new ResponseEntity<List>(ordersService.yearlySales(), HttpStatus.OK);
    }

    @GetMapping(value = "/order/monthlySales/{year}")
    public ResponseEntity<List> yearlyProductSales(@PathVariable int year){
        return new ResponseEntity<List>(ordersService.monthlySales(year), HttpStatus.OK);
    }
    
    @GetMapping(value = "/todaysSale")
	public ResponseEntity<Double> todaysSale(){
		return ResponseEntity.ok(ordersService.todaysSale()); }
    
    @GetMapping(value = "/totalSale")
	public ResponseEntity<Double> totalSale(){
		return ResponseEntity.ok(ordersService.totalsSale()); }

    @GetMapping(value = "/order/dailySales/{year}/{month}")
    public ResponseEntity<Object[][]> dailySales(@PathVariable int year, @PathVariable int month){
        return new ResponseEntity<Object[][]>(ordersService.dailySalesByYearMonth(year, month), HttpStatus.OK);
    }

    @GetMapping("/get-long")
    public ResponseEntity<Long> sendLongValue(@RequestParam Long id) {
        System.out.println("Received request for ID: " + id);

        // Simulate a fetched value based on the ID
        Long value = id * 100; // Example logic
        return ResponseEntity.ok(value);
    }
    
}
