package com.ecommerce.service;

import com.ecommerce.entity.Vendor;

public interface VendorService {
	
	public Vendor addVendor(Vendor vendor);
	public Vendor getVendor(int id);
	public int getVendorIdByUserMail(String mail);
	public int getVendorIdByEmail(String email);
	public Vendor updateVendor(Vendor vendor);
}
