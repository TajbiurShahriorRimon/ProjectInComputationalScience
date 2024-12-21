import React from 'react';
import  "./vendorprofile.css";
import VendorProfileNavbar from '../Navbar/VendorProfileNavbar';
import VendorAddProduct from '../Forms/AddProducts';



function VendorEditProducts(){

return (
        <div className='container'>
            <VendorProfileNavbar/>
            <VendorAddProduct/>
            
        </div>    
    )
}

export default VendorEditProducts;
