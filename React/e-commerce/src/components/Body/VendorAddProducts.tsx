import React from 'react';
import  "./vendorprofile.css";
import VendorProfileNavbar from '../Navbar/VendorProfileNavbar';
import VendorAddProduct from '../Forms/AddProducts';
import VendorNavbar from "../Navbar/VendorNavbar";



function VendorAddProducts(){

return (
        <div className='container'>
            {/*<VendorProfileNavbar/>*/}
            <VendorNavbar/>
            <VendorAddProduct/>
            
        </div>    
    )
}

export default VendorAddProducts;
