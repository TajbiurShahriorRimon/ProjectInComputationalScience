import React from "react";
import HomeNavbar from "../Navbar/HomeNavbar";
import Customer from "./Customer";
import VendorNavbar from "../Navbar/VendorNavbar";
import {AdminNavbar} from "../Navbar/AdminNavbar";
import SiteProductSearch from "../Body/siteProductSearch";
import {CustomerNavbar} from "../Navbar/CustomerNavbar";

const ProductSearch = () => {
    return(
        <div>
            <HomeNavbar/>
            <CustomerNavbar/>

            <AdminNavbar/>
            <VendorNavbar/>

            <SiteProductSearch/>
        </div>
    )
}

export default ProductSearch;