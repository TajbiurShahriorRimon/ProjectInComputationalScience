import {CustomerNavbar} from "../Navbar/CustomerNavbar";
import React from "react";
import SiteProductReview from "../Body/siteProductReviews";
import HomeNavbar from "../Navbar/HomeNavbar";
import {AdminNavbar} from "../Navbar/AdminNavbar";
import VendorNavbar from "../Navbar/VendorNavbar";

function ProductReviews() {
    return(
        <div >
            <CustomerNavbar/>
            <HomeNavbar/>
            <AdminNavbar/>
            <VendorNavbar/>
            <SiteProductReview/>
        </div>
    )
}

export default ProductReviews;