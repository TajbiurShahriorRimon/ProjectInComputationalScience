package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dao.MailDao;
import com.ecommerce.entity.Mail;
@Service
public class MailServiceImpl implements MailService {
	
	@Autowired
	private MailDao mailDao;

	@Override
	public Mail addMail(Mail mail) {
		// TODO Auto-generated method stub
		mail.setVerificationCode();
		mailDao.save(mail);
		return null;
	}

	@Override
	public Mail verifyMail(Mail mail) {
		// TODO Auto-generated method stub
		Mail fetchedMail=mailDao.findById(mail.getMail()).get();
		if(fetchedMail.getVerificationCode().equals(mail.getVerificationCode())) {
			return fetchedMail;
		}
		return null;
	}

}
