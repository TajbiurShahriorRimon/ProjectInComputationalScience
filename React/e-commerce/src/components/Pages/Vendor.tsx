import React from 'react';
import VendorHome from '../Body/vSiteHome';
import VendorNavbar from '../Navbar/VendorNavbar';
import './home.css'

export default function Vendor(){
    return (
        
            <div className='home'>
                <VendorNavbar/>
                <VendorHome/>
                
            </div>
              
    )
}