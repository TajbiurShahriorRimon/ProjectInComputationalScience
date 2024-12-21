package com.ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dao.UserDao;
import com.ecommerce.entity.User;
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public User getUser(String userId) {
		// TODO Auto-generated method stub
//		User user= new User();
//		user.name="Asif";
		//return userDao.getById(userId);
		return userDao.findById(userId).get();
	}

	@Override
	public User addUser(User user) {
		// TODO Auto-generated method stub
		//user.setStatus("inactive");
		user.setStatus("inactive");
		userDao.save(user);
		
		return user;
	} 
	
	@Override
	public User getUserDataForSession(String email){
		var user = userDao.findById(email).get();
		return user;
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		var products = (List<User>) userDao.findAll()
				.stream().filter(x -> !x.getType().equals("admin".toString())).collect(Collectors.toList());
		return products;
	}

	public boolean userExists(String mail) {
		// TODO Auto-generated method stub
		
		return userDao.existsById(mail);
	}

	@Override
	public void manageUser(String mail) {
		
		User entity = userDao.getById(mail);
		if(entity.getStatus().equals("active")) {
			entity.setStatus("inactive");
			userDao.save(entity);
		}else {
			entity.setStatus("active");
			userDao.save(entity);
			}
		}

	// @Transactional
	// @Override
	// public User updateUser(User user, String userEmail) {
	// 	User userData = userDao.findById(userEmail).get();

	// 	var userList = userDao.findAll().stream().filter(x -> x.getMail() != userEmail).collect(Collectors.toList());

	// 	for (User user2 : userList) {
	// 		if(user2.getMail().equals(user.getMail().toString())){
	// 			return null;
	// 		}
	// 	}

	// 	// entityManager.createNativeQuery("Update user_table set mail='"+user.getMail()+"', address='"+user.getAddress()+"', gender='"+user.getGender()+"' where mail='"+userEmail+"'");
	// 	// .setParameter(1, user.getMail())
	// 	// .setParameter(2, user.getAddress());

	// 	try {
	// 		entityManager.createNativeQuery("Update user_table set name=?, address=?, gender=?, mail=?, phone=? where mail=?")
	// 		.setParameter(1, user.getName())
	// 		.setParameter(2, user.getAddress())
	// 		.setParameter(3, user.getGender())
	// 		.setParameter(4, user.getMail())
	// 		.setParameter(5, user.getPhone())
	// 		.setParameter(6, userEmail)
	// 		.executeUpdate();
	// 	} catch (Exception e) {
	// 		var c = "dsd";
	// 	}

	// 	// userData.setAddress(user.getAddress());
	// 	// userData.setGender(user.getGender());
	// 	// userData.setName(user.getName());
	// 	// userData.setMail(user.getMail());
	// 	// userData.setPhone(user.getPhone());

	// 	// userDao.save(userData);
	// 	return user;
	// }

	@Override
	public User updateUser(User user) {
		User userData = userDao.findById(user.getMail()).get();

		userData.setAddress(user.getAddress());
		userData.setGender(user.getGender());
		userData.setName(user.getName());
		userData.setPhone(user.getPhone());

		userDao.save(userData);
		return user;
	}

	@Override
	public List<User> searchUser(String key) {

		return userDao.search(key);
	}

	@Override

	public void activateUser(String mail) {
		// TODO Auto-generated method stub
		User user=userDao.findById(mail).get();
		user.setStatus("active");
		userDao.save(user);
		System.out.println("User activated");
	}

	public int activeUser() {

		return userDao.activeUser();
	}

	@Override
	public int inActiveUser() {
		// TODO Auto-generated method stub
		return userDao.inActiveUser();
 
	}

	@Override
	public boolean userIsActive(String mail) {
		// TODO Auto-generated method stub
		return userDao.findById(mail).get().getStatus().equals("active");
		 
	}
	
}
