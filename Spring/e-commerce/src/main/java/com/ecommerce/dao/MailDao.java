package com.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.entity.Mail;

public interface MailDao extends JpaRepository<Mail, String> {

}
