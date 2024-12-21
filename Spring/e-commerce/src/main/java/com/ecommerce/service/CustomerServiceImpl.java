package com.ecommerce.service;

import com.ecommerce.dao.CustomerDao;
import com.ecommerce.entity.Customer;
import com.ecommerce.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerDao customerDao;

    @Override
    public int getCustomerIdByEmail(String email) {
        var customer = customerDao.findAll().stream().filter(x -> x.getMail().getMail().equals(email.toString()))
        .findFirst().orElse(null);
        return customer.getId();
    }

	@Override
	public void addCustomer(User user) {
		// TODO Auto-generated method stub
		
		Customer customer=new Customer();
		customer.setMail(user);
		customerDao.save(customer);
		
	}
    
    
}
