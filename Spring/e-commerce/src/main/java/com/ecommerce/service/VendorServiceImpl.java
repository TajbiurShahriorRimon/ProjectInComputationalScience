package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dao.VendorDao;
import com.ecommerce.entity.Vendor;
@Service
public class VendorServiceImpl implements VendorService{

	@Autowired
	private VendorDao vendorDao;
	
	@Override
	public Vendor addVendor(Vendor vendor) {
		// TODO Auto-generated method stub
		vendorDao.save(vendor);
		return vendor;
	}

	@Override
	public Vendor getVendor(int id) {
		// TODO Auto-generated method stub
		return vendorDao.findById(id).get();
	}

	@Override
	public int getVendorIdByUserMail(String mail) {
		// TODO Auto-generated method stub
		System.out.println(vendorDao.findByUserMail(mail).getId());
		return vendorDao.findByUserMail(mail).getId();
	}

	@Override
	public int getVendorIdByEmail(String email){
		var vendor = vendorDao.findAll().stream().filter(x -> x.getMail().getMail().equals(email.toString())).findFirst().orElse(null);
		return vendor.getId();
	}

	@Override
	public Vendor updateVendor(Vendor vendor) {
		vendorDao.save(vendor);
		return vendor;
	}

}
