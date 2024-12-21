package com.ecommerce.service;

import java.util.ArrayList;
import java.util.stream.Collectors;

import com.ecommerce.dao.SalesDao;
import com.ecommerce.entity.Sales;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalesServiceImpl implements SalesService {
    @Autowired
    private SalesDao salesDao;

    @Override
    public void addSales(ArrayList<Sales> sales) {
        for (Sales item : sales) {
            salesDao.save(item);
        }
    }

    public ArrayList<Sales> getPendingOrderByIdSales(int id){
        var sales = (ArrayList<Sales>) salesDao.findAll().stream().filter(x -> x.getOrder().getId() == id)
        .collect(Collectors.toList());
        if(sales == null){
            return null;
        }
        return sales;
    }

    @Override
    public ArrayList<Sales> getOrderByIdSales(int id) {
        var sales = (ArrayList<Sales>) salesDao.findAll().stream().filter(x -> x.getOrder().getId() == id)
        .collect(Collectors.toList());
        if(sales == null){
            return null;
        }
        return sales;
    }
    
}
