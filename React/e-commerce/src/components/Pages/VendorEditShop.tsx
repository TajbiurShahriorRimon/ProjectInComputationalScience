import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import un_auth from "../../unAuthRedirect/unAuth";
import {AdminNavbar} from "../Navbar/AdminNavbar";
import SiteCategoryProductsCount from "../Body/siteCategoryProductsCount";
import VendorNavbar from "../Navbar/VendorNavbar";
import UpdateVendorRegShop from "../Forms/UpdateVendorRegShop";

const VendorEditShop = () => {
    var navigate = useNavigate();

    useEffect(() => {
        let token= "Bearer "+localStorage.getItem("token");
        console.log(token);
        axios.post(`${base_url}tokenValidation`,"data",{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then(
            (response)=>{
                //navigate("/customer/index");
                if(localStorage.getItem("userType_session") != "vendor"){
                    navigate(`${un_auth}`); //un_auth
                }
            },(error)=>{
                navigate(`${un_auth}`);
            }
        );
    }, [])

    return(
        <div>
            <VendorNavbar/>
            <UpdateVendorRegShop/>
        </div>
    )
}

export default VendorEditShop;