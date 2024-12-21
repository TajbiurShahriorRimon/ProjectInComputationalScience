import React, { useState } from 'react';
import { Input,Row,Form,Col,Label,Button,Container } from 'reactstrap';
import axios from 'axios';
import base_url from '../../api/bootapi';
import {useNavigate, useParams} from 'react-router-dom';

export default function UserPassword(){

    const navigate = useNavigate();

    //variable name must be same as the name used in the link in routes
    type LoginParams={
        mail:string;
    };
    
    const { mail } = useParams<LoginParams>();


    const [passwordObj,setPassword]=useState({
        mail:"",
        password:"",
        confirmPassword:""

        
    });
    const [mailObj,setMail]=useState({
        mail:"",
        verificationCode:""

        
    });

    const [passwordErr, setPasswordErr] = useState({
        passwordErr1:"",
        confirmPasswordErr:""
    })
    const [testErr, setTestErr] = useState({
        tErr:""
    })


    const handleForm=(e:any)=>{
        var isValid = true

        if(passwordObj.password == ""){
            //alert('fsdf')
            isValid = false;
            setTestErr({
                tErr: "Password cannot be empty"
            })
        }
        else if (passwordObj.password.length < 5){
            isValid = false;
            setTestErr({
                tErr: "Password must be at least 5 characters"
            })
        }
        else {
            setTestErr({
                tErr: ""
            })
        }

        if(passwordObj.confirmPassword == ""){
            isValid = false;
            setPasswordErr({
                ...passwordErr,
                confirmPasswordErr: "Confirm Password Cannot be Empty"
            })
        }
        else {
            setPasswordErr({
                ...passwordErr,
                confirmPasswordErr: ""
            })
        }
        if(passwordObj.password != passwordObj.confirmPassword){
            isValid = false;
            setPasswordErr({
                ...passwordErr,
                confirmPasswordErr: "Password did not match the Confirm Password"
            })
        }
        if(isValid == true) {

            if (passwordObj.password == passwordObj.confirmPassword) {
                passwordObj.mail = mail!;
                postDataToServer(JSON.stringify(passwordObj));
                e.preventDefault();

            }
            /*else {
                alert("Passwords do not match");
            }*/
        }
     }


    const postDataToServer=(data:any)=>{
        
        
        axios.post(`${base_url}uLoginReg`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
              //  alert(passwordObj.mail);
                postMailToServer(passwordObj.mail);
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
//send verification link in mail
    const postMailToServer=(data:any)=>{
       // alert(data+" mail");
        mailObj.mail=data
        axios.post(`${base_url}mailReg`,mailObj,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                alert("A confirmation link has been sent to your mail");
                navigate("/login");
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
        <div>
             
            <Row className='justify-content-center my-5'>
                <Col md={4}>
                    <Form /*onSubmit={handleForm}*/>
                        <div>
                            <Label className='form-label my-2' for="pass">
                                Password
                            </Label>
                            <Input 
                            type="password" 
                            id="pass" name="password"
                            placeholder='At least 5 characters' minlength="5" required
                            onChange={(e)=>{
                                setPassword({...passwordObj,password:e.target.value})
                            }}
                            />
                            <div className="text-danger">
                                {/*{passwordErr.passwordErr1 == "" ? "" : passwordErr.passwordErr1}*/}
                                {testErr.tErr == "" ? "" : testErr.tErr}
                            </div>

                            <Label className='form-label my-2' for="confirmPass">
                                Confirm Password
                            </Label>
                            <Input 
                            type="password" id="confirmPass" 
                            name="confirmPassword"
                            placeholder='Confirm password' minlength="5" required
                            onChange={(e)=>{
                                setPassword({...passwordObj,confirmPassword:e.target.value})
                            }}
                            />
                            <div className="text-danger">
                                {passwordErr.confirmPasswordErr == "" ? "" : passwordErr.confirmPasswordErr}
                            </div>
                            {/*<Button className='my-2 w-100' type='submit' color='primary'>Submit</Button>*/}
                        </div>
                    </Form>
                    <Button className='my-2 w-100' type='button' onClick={handleForm} color='primary'>Submit</Button>
                   
                </Col>
            </Row>
            
        </div>
    )


}