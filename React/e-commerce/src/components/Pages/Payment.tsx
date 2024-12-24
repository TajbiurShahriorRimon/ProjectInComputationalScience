import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import un_auth from "../../unAuthRedirect/unAuth";
import EditProduct from "../Forms/EditProducts2";
import SitePayment from "../Body/sitePayment";

const Payment = () => {
    var navigate = useNavigate();

    useEffect(() => {        
        if(localStorage.getItem("shoppingCart") == null){
            navigate(`${un_auth}`);
        }
    }, [])

    return (
        <div>
            hellp
            <SitePayment/>
        </div>
    );
}

export default Payment;