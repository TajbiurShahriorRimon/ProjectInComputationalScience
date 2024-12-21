package com.ecommerce.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name="user_table")
public class User {
	
	
	@Id
	@NotEmpty(message="Mail cannot be empty")
	@Email(message="Email must be valid")
	private String mail;
	
	@NotEmpty
	@Size(min=4,message="Name must have at least 4 characters")
	private String name;
	
	@Size(min=11,message="Invalid phone number")
	private String phone;
	
	@NotEmpty(message="Address cannot be empty")
	
	private String address;
	private String type;
	private String gender;
	private String status;
	
	
	
	
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	public void setType() {
		this.type="customer";
	}
	
	
	@Override
	public String toString() {
		return "User [mail=" + mail + ", name=" + name + ", phone=" + phone + ", address=" + address + ", type=" + type
				+ ", gender=" + gender + ", status=" + status + "]";
	}
	
}
