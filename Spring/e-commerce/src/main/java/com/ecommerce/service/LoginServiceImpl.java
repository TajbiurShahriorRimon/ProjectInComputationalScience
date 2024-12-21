package com.ecommerce.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.dao.LoginDao;
import com.ecommerce.entity.Login;
@Service
public class LoginServiceImpl implements LoginService,UserDetailsService{

	@Autowired
	private LoginDao loginDao;
	
	
	
	@Override
	public Login addLogin(Login login) {
		
		loginDao.save(login);
		return null;
	}

	

	@Override
	public Login verifyLogin(Login login,String mail, String password) {
		// TODO Auto-generated method stub
		System.out.println(login);
		login=loginDao.findById(mail).get();
		System.out.println(login.getPassword());
		if(login.getPassword().equals(password)) {
			
			return login;
		}
		return null;
	}



	@Override
	public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		if(!loginDao.findById(mail).isEmpty()) {
			String email=loginDao.findById(mail).get().getMail();
			String password=loginDao.findById(mail).get().getPassword();
			return new User(email,password, new ArrayList<>());
		}else {
			throw new UsernameNotFoundException("Invalid credentials");
		}
	}

	@Override
	public Login changePassword(Login login) {
		Login data = loginDao.findById(login.getMail()).get();
		data.setPassword(login.getPassword());
		loginDao.save(data);
		return login;
	}
	
	

//	@Override
//	public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
//		
//		Login login=loginDao.getById(mail);
//		
//		if(login==null)
//			throw new UsernameNotFoundException("The mail you provided is invalid");
//		return login;
//	}



}
