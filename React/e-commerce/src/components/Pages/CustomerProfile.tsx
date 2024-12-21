import React, {Component, useEffect} from "react";
import {CustomerNavbar} from "../Navbar/CustomerNavbar";
import SiteCustomerProfile from "../Body/siteCustomerProfile";
import {AdminNavbar} from "../Navbar/AdminNavbar";
import axios from "axios";
import base_url from "../../api/bootapi";
import un_auth from "../../unAuthRedirect/unAuth";
import {useNavigate} from "react-router-dom";
import VendorNavbar from "../Navbar/VendorNavbar";

function CustomerProfile(){
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
                if(localStorage.getItem("userType_session") == null){
                    navigate(`${un_auth}`); //un_auth
                }
            },(error)=>{

                navigate(`${un_auth}`);
                let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";

                navigate(`${un_auth}`);

                /*for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                navigate("/");*/

                //alert(errorMsg);
            }
        );
    }, [])

    return (
        <div>
            <CustomerNavbar/>
            <AdminNavbar/>
            <VendorNavbar/>
            <SiteCustomerProfile/>
        </div>
    )
}

export default CustomerProfile;