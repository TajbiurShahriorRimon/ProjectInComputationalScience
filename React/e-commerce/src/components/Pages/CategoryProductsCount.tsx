import React, {useEffect} from "react";
import SiteCategoryProductsCount from "../Body/siteCategoryProductsCount";
import {AdminNavbar} from "../Navbar/AdminNavbar";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import base_url from "../../api/bootapi";
import un_auth from "../../unAuthRedirect/unAuth";

const CategoryProductsCount = () => {
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
                if(localStorage.getItem("userType_session") != "admin"){
                    navigate(`${un_auth}`); //un_auth
                }
            },(error)=>{
                navigate(`${un_auth}`);
            }
        );
    }, [])

    return(
        <div>
            <AdminNavbar/>
            <SiteCategoryProductsCount/>
        </div>
    )
}

export default CategoryProductsCount;