import React from 'react';
import LoginForm from '../Forms/Login';
import HomeNavL from '../Navbar/HomeNavbarL';
import './home.css'

export default function Login(){
    return (
        
            <div className='home'>
                <HomeNavL/>
                <LoginForm/>
                
            </div>
              
    )
}