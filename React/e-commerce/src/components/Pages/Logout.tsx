import React, {Component, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {CustomerNavbar} from "../Navbar/CustomerNavbar";
import SiteCustomerProductForReview from "../Body/SiteCustomerProductForReview";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        //alert("dsds");
        localStorage.clear();
        navigate("/login");
    })

    return (
        <div>

        </div>
    );
}

export default Logout;