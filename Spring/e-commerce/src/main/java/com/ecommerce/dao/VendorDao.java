package com.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.entity.Vendor;

public interface VendorDao extends JpaRepository<Vendor, Integer>{

	@Query(value="SELECT * FROM vendor_dummy3 t WHERE t.user_mail = :userMail",nativeQuery=true)
    public Vendor findByUserMail(@Param("userMail") String userMail);
}
