package com.ecommerce.service;

import java.util.List;

import com.ecommerce.entity.User;

public interface UserService {

	
	public User getUser(String userId );

	public User addUser(User user);

	public User getUserDataForSession(String email);
	
	public List<User> getAllUsers();
  
	public boolean userExists(String mail);
	
	public void manageUser(String mail);

	public User updateUser(User user);
	
	public List<User> searchUser(String key );
	

	public void activateUser(String mail);
	
	public boolean userIsActive(String mail);

	public int activeUser();
	
	public int inActiveUser();

}
