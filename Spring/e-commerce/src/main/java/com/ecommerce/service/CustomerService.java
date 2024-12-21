package com.ecommerce.service;

import com.ecommerce.entity.User;

public interface CustomerService {
    public int getCustomerIdByEmail(String email);
    public void addCustomer(User user);
}
