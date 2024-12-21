package com.ecommerce.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecommerce.entity.User;

public interface UserDao extends JpaRepository<User, String> {
	
	@Query(value = "SELECT * FROM user_table WHERE name LIKE %:key% AND type<> 'admin' ", nativeQuery = true)
	List<User> search(String key);
	
	@Query(value = "SELECT COUNT(mail) FROM `user_table` WHERE status='active' AND type<> 'admin' ", nativeQuery = true)
	int activeUser();
	
	@Query(value = "SELECT COUNT(mail) FROM `user_table` WHERE status='inactive' AND type<> 'admin' ", nativeQuery = true)
	int inActiveUser();

}
