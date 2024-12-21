import React from 'react';
import  "./vendorprofile.css";
import VendorProfileNavbar from '../Navbar/VendorProfileNavbar';
import VendorRegistrationUser from './../Forms/VendorRegistrationUser';



function VendorProfile(){

return (
        <div className='container'>
            <VendorProfileNavbar/>
            <VendorRegistrationUser/>
            
        </div>    
    )
}
export default VendorProfile;

