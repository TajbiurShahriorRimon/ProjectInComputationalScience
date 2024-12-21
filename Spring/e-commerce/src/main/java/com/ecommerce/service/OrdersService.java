package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.ecommerce.entity.Orders;
import com.ecommerce.entity.Sales;

//import antlr.collections.List;

public interface OrdersService {
    public Orders addOrder(Orders orders);
    public List checkIfCustomerPurchasedProduct(int productId, int customerId);
    //public Map<Integer, java.util.List<Sales>> getPendingOrders();
    public ArrayList<Orders> getPendingOrders();
    public boolean setDeliverdStatus(int id);
    public boolean setCancelStatus(int id);
    public ArrayList<Orders> getAllOrdersCustomerById(int id);
    public ArrayList<Orders> getAll();

    public List<Object> yearlySales();
    public List<Object> monthlySales(int year);
    
    public double todaysSale();
    public double totalsSale();

    public Object[][] dailySalesByYearMonth(int year, int month);
}
