package com.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.entity.Login;

public interface LoginDao extends JpaRepository<Login, String>{

}
