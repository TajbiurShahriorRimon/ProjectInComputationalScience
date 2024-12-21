package com.ecommerce.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import net.bytebuddy.utility.RandomString;
@Entity
@Table(name="mailDummy1")
public class Mail {

	@Id
	private String mail;
	
	
	private String verificationCode;
	
	

	public String getVerificationCode() {
		return verificationCode;
	}

	public void setVerificationCode() {
		this.verificationCode = RandomString.make(10) ;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}
	@Override
	public String toString() {
		return "Mail [mail=" + mail + ", verificationCode=" + verificationCode + "]";
	}

}
