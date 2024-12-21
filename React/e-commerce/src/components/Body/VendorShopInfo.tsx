import React from 'react';
import  "./vendorprofile.css";
import VendorProfileNavbar from '../Navbar/VendorProfileNavbar';
import VendorRegistrationShop from '../Forms/VendorRegistrationShop';



function VendorProfile(){

return (
        <div className='container'>
            <VendorProfileNavbar/>
            <VendorRegistrationShop/>
            
        </div>    
    )
}
export default VendorProfile;

