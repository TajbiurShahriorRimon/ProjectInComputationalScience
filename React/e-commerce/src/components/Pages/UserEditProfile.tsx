import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import un_auth from "../../unAuthRedirect/unAuth";
import {CustomerNavbar} from "../Navbar/CustomerNavbar";
import SiteShoppingCart from "../Body/siteShoppingCart";
import {AdminNavbar} from "../Navbar/AdminNavbar";
import VendorNavbar from "../Navbar/VendorNavbar";
import UserUpdateForm from "../Forms/UserUpdateForm";

const UserEditProfile = () => {
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
                /*let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";*/

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
            <UserUpdateForm/>
        </div>
    );
}

export default UserEditProfile;