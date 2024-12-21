import React from 'react';
import VendorForm from '../Forms/VendorRegistrationUser';
import HomeNavL from '../Navbar/HomeNavbarL';
import './home.css'

export default function VendorReg(){
    return (
        
            <div className='home'>
                <HomeNavL/>
                <VendorForm/>
                
            </div>
              
    )
}