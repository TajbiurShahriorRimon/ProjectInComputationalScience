import React, { useState,Component } from "react";

import { useEffect } from 'react';
import axios from 'axios';
import base_url from '../../api/bootapi';
import { useNavigate } from 'react-router-dom';


class VerifyMail extends Component<any, any>{
    constructor(props : any) {
        super(props);
    }

    state = {
        mail: {
            mail: "",
            verificationCode: ""
        }
    }
    
    async componentDidMount() {
        let params:string[] = window.location.pathname.split("/");
        this.state.mail.verificationCode=params.pop()!;
        this.state.mail.mail=params.pop()!;
        //alert(this.state.mail.verificationCode);
        //alert(this.state.mail.mail);
        //post mail object to verify the email and verification code and activate user
        axios.post(`${base_url}verifyMail`,this.state.mail).then(
            (response)=>{
                //alert(response.data.mail);
                alert("Mail registration successfull");
                window.location.replace("/login");
            },(error)=>{
                
                
                
                  alert(error.response.data);
                
                
                
                
            }
        );
    }

    render(){
        return(
            <div></div>
        );
    }
    

}

export default VerifyMail;
