package com.ecommerce.service;

import com.ecommerce.entity.Login;

public interface LoginService {
	
	public Login addLogin(Login login);
	public Login verifyLogin(Login login,String mail, String password);
	public Login changePassword(Login login);
}
