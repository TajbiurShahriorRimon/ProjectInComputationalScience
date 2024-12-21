import React, {useEffect} from 'react';
import  "./vendorprofile.css";
import {AdminNavbar} from '../Navbar/AdminNavbar';
import AddCategory from '../Forms/AddCategory';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import base_url from "../../api/bootapi";
import un_auth from "../../unAuthRedirect/unAuth";



const AdminAddCategories = () => {
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
                let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";

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
        <div className='container'>
            <AdminNavbar/>
            <AddCategory/>
        </div>    
    )
}

export default AdminAddCategories;
