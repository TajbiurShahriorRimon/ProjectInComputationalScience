import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import un_auth from "../../unAuthRedirect/unAuth";
import {AdminNavbar} from "../Navbar/AdminNavbar";
import SiteMonthlySales from "../Body/siteMonthlySales";

const MonthlySales = () => {
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
            <SiteMonthlySales/>
        </div>
    )
}

export default MonthlySales;