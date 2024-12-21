package com.ecommerce.controller;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Mail;
import com.ecommerce.service.MailService;
import com.ecommerce.service.UserService;

@RestController
public class MailController {

	
	@Autowired
	 public JavaMailSender emailSender;
	@Autowired
	 public MailService mailService;
	@Autowired
	public UserService userService;
	
	@PostMapping(value="/mailReg")
	public void sendMail(@RequestBody Mail mail ) throws  UnsupportedEncodingException, MessagingException {
		
		mailService.addMail(mail);
		
		String mailContent="<p>Dear Customer,</p>"
						 + "<p>Please click the link below to verify your email</p>"
						 +"<h3><a href=\"http://localhost:3000/verifyMail/"+ mail.getMail()+"/"+mail.getVerificationCode()+"\">VERIFY</a></h3>";
		//<a href="https://www.w3schools.com">Visit W3Schools.com!</a>
		
		
		MimeMessage mimeMsg=  emailSender.createMimeMessage();
		MimeMessageHelper helper= new MimeMessageHelper( mimeMsg);
		
		helper.setFrom("dokan3976@gmail.com", "Dokan Team");
		helper.setTo(mail.getMail());
		helper.setSubject("Mail cofirmation");
		helper.setText(mailContent, true);
		
		System.out.println(mail.getMail());
		
		emailSender.send(mimeMsg);
		System.out.println("Success");
	}
	
	
	@PostMapping(value="/verifyMail")
	public ResponseEntity<?> validateMail(@RequestBody Mail mail ) {
		System.out.println(mail);
		mail=mailService.verifyMail(mail);
		if(mail!=null) {
			userService.activateUser(mail.getMail());
			return ResponseEntity.ok(mail);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid credentials");
	}
	
}
