import React, {Component} from "react";
import {CustomerNavbar} from "../Navbar/CustomerNavbar";
import SiteCustomerProductForReview from "../Body/SiteCustomerProductForReview";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import base_url from '../../api/bootapi';


const CustomerProductForReview = () => {
    const navigate = useNavigate();

    const verifyToken=()=>{
        
        let token= "Bearer "+localStorage.getItem("token");
        console.log(token);
        axios.post(`${base_url}tokenValidation`,"data",{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
               navigate("/customer/index");
            },(error)=>{
                
                let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";

                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  alert(errorMsg);
            }
        );
    };

    const handleClick = () => { // call back function
        //alert("dsd");

        verifyToken();
        var sig = 0;
        if (sig == 1){
            navigate("/product/customer/giveReview/2");
        }
    }

    return (
        <div onLoad={handleClick}>
            <CustomerNavbar/>
            <SiteCustomerProductForReview/>
        </div>
    );
}

export default CustomerProductForReview;
