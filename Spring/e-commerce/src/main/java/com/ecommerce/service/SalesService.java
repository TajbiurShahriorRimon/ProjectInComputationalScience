package com.ecommerce.service;

import java.util.ArrayList;

import com.ecommerce.entity.Sales;

public interface SalesService {
    public void addSales(ArrayList<Sales> sales);
    public ArrayList<Sales> getPendingOrderByIdSales(int id);
    public ArrayList<Sales> getOrderByIdSales(int id);
}
