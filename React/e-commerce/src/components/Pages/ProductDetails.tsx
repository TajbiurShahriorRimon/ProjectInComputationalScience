import React, {Component} from "react";
import {CustomerNavbar} from "../Navbar/CustomerNavbar";
import SiteProductDetails from "../Body/siteProductDetails";
import HomeNavbar from "../Navbar/HomeNavbar";
import {AdminNavbar} from "../Navbar/AdminNavbar";
import VendorNavbar from "../Navbar/VendorNavbar";

class ProductDetails extends Component<any, any>{
    render() {
        return(
            <div>
                <CustomerNavbar/>
                <AdminNavbar/>
                <VendorNavbar/>
                <HomeNavbar/>
                <SiteProductDetails/>
            </div>
        )
    }
}

export default ProductDetails;