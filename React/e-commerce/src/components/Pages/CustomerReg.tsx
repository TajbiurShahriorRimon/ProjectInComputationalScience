import React from 'react';
import UserForm from '../Forms/UserRegistration';
import HomeNavL from '../Navbar/HomeNavbarL';
import './home.css'

export default function CustomerReg(){
    return (
        
            <div className='home'>
                <HomeNavL/>
                <UserForm/>
                
            </div>
              
    )
}