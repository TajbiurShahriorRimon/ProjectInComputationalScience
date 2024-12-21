import React from 'react';
import SiteHome from '../Body/SiteHome';
import HomeNavbar from '../Navbar/HomeNavbar';
import RegOption from '../RegOption';
import './home.css'
import {AdminNavbar} from "../Navbar/AdminNavbar";
import VendorNavbar from "../Navbar/VendorNavbar";
import {CustomerNavbar} from "../Navbar/CustomerNavbar";


export default function Home(){
    return (
        
            <div className='home'>
                <HomeNavbar/>
                <AdminNavbar/>
                <VendorNavbar/>
                <CustomerNavbar/>
                <SiteHome/>
                
            </div>
              
    )
}