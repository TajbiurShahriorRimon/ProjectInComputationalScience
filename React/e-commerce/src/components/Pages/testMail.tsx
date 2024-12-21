import React, { useState } from 'react';
import axios from 'axios';
import base_url from '../../api/bootapi';
import { useParams, useNavigate } from 'react-router-dom';

export default function TestMail(){


    const [vendor,setVendor]=useState({
        mail:""
        
    });


    type MailParams={
        mail:string;
    };
    
    const { mail } = useParams<MailParams>();


    const handleForm=(e:any)=>{
        ;
         
         vendor.mail=mail!;
 
         alert(vendor.mail);
         postDataToServer(JSON.stringify(vendor));
         e.preventDefault();
     }
 
     //function to post data on server
     const postDataToServer=(data:any)=>{
         
         axios.post(`${base_url}mailReg`,data,{
             headers: {
                 'Content-Type': 'application/json',
                  'Accept': 'application/json'
             }}).then(
             (response)=>{
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

     return(
        <div >
            
                    <form onSubmit={handleForm}>
                            
                        <input type="submit" value="Submit"/>
                    </form>
   
        </div>
     )

}