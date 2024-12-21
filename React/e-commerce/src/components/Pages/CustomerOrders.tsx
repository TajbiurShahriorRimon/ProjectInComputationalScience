import {useNavigate} from "react-router-dom";
import axios from "axios";
import base_url from "../../api/bootapi";
import un_auth from "../../unAuthRedirect/unAuth";
import {CustomerNavbar} from "../Navbar/CustomerNavbar";
import CustomerHome from "../Body/CustomerHome";
import React, {useEffect} from "react";
import SiteOrderCustomer from "../Body/siteOrderCustomer";

const CustomerOrders = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let token= "Bearer "+localStorage.getItem("token");
        console.log(token);
        axios.post(`${base_url}tokenValidation`,"data",{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then(
            (response)=>{ //user is authorized
                //alert("Authorized");
                if(localStorage.getItem("userType_session") != "customer"){ //only authorized customer can get access
                    navigate(`${un_auth}`) //un_auth
                    //alert("not customer");
                }
                //navigate("/customer/index");
                return
            },(error)=>{
                //alert("UnAuth")
                let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";

                navigate(`${un_auth}`);

                /*for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }*/
                //alert(errorMsg);
            }
        );
    }, [])

    return(
        <div>
            <CustomerNavbar/>
            <SiteOrderCustomer/>
        </div>
    )
}

export default CustomerOrders;