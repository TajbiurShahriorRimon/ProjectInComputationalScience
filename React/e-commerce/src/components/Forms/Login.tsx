import React, { useState } from 'react';
import logo from './logo.svg';
//import '../../App.css';
import {Button,Form,FormGroup,Label,Container,Input,Row,Col,FormFeedback} from "reactstrap";
import { group } from 'console';
import { useEffect } from 'react';
import base_url from '../../api/bootapi';
import axios from 'axios';
import {useNavigate} from "react-router-dom";




function Login(){
    var navigate = useNavigate();

    const [login,setLogin]=useState({
        mail:"",
        password:""
        
    });

    const [error,setError]=useState({
        errorMessage: "",

    });

    const handleForm=(e:any)=>{
        console.log(login);
        if(login.mail == "" || login.password == ""){
            setError({
                errorMessage: "Fields cannot be empty"
            })
            return;
        }
        
        
        postDataToServer(JSON.stringify(login));
        e.preventDefault();
    }



    const getUserInfo = async (email: any) => {
        //getting the user information who is to be logged in
        var resp = await axios.get(`${base_url}user/getUserDataForSession/${email}`);
        if(resp.status == 200){
            localStorage.setItem("userType_session", resp.data.type);
            if(resp.data.type == "customer"){
                //alert("Customer");
                var vendorResp = await axios.get(`${base_url}customer/getCustomerIdByEmail/${email}`);
                console.log(vendorResp.data);
                if(vendorResp.status == 200){
                    localStorage.setItem("userId_session", vendorResp.data); //customerId from customer table
                    //redirecting to customer page. Depending on user type the redirection occurs
                    navigate("/customer/index");
                }
            }
            else if(resp.data.type == "vendor"){
                //alert("vendor")
                var vendorResp = await axios.get(`${base_url}vendor/getVendorIdByEmail/${email}`);
                console.log(vendorResp.data);
                if(vendorResp.status == 200){
                    localStorage.setItem("userId_session", vendorResp.data); //vendorId from vendor table
                    navigate("/vHome");
                }
            }
            else { //user is Admin
                //navigate('/order/pending');
                navigate('/admin');
            }
        }
    }

    const postDataToServer = async (data:any)=>{
        //${base_url}login this is the line that decides on which controller method the req will be posted
        await axios.post(`${base_url}login`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                    console.log(response.data);

                //Log-in Success
                //Storing data into local storage
                localStorage.setItem("email", response.data.mail);
                localStorage.setItem("token", response.data.token); //JWT Token

                //check for user type
                //var resp = axios.get(`${base_url}user/getUserDataForSession/${response.data.mail}`);
                //await getUserData(response.data.mail);
                getUserInfo(response.data.mail);

                //redirecting to customer page. Depending on user type the redirection occurs
                //navigate("/customer/productForReview");

            },(error)=>{
                    //alert("Invalid Credentials");
                    setError({
                        errorMessage: "Invalid Credentials"
                    })
               }
        );
    };


    return(
        <div >
            <Container >
            <Row className='justify-content-center my-5'>
                <Col md={4}>
                <h1  className="form-label my-2">Login</h1><br></br>
                    <Form /*onSubmit={handleForm}*/>
                            <Label className="form-label my-2" for="email">
                                Email
                            </Label>
                            <Input 
                                id="email"
                                name="email"
                                placeholder="Enter Your Email"
                                type="email"
                                className='form-control'
                                onChange={(e)=>{
                                    setLogin({...login,mail:e.target.value})
                                }}
                            />
                            

                            <Label className='form-label my-2' for="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="price"
                                placeholder="Enter Your Password"
                                type="password"
                                className='form-control'
                                onChange={(e)=>{
                                    setLogin({...login,password:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {error.errorMessage}
                            </div>
                            <br></br>
                            {/*<div className="row mb-4">
                                <div className="col d-flex justify-content-center">
                                <div>
                                    <input type="checkbox" value="" id="remember" checked />
                                    <label> Remember me </label>
                                </div>
                                </div>

                                <div className="col">
                                <a href="#!">Forgot password?</a>
                                </div>
                            </div>*/}

                            {/*<Button className='my-2 w-100' type='submit' color='primary'>Login</Button><br></br><br></br>*/}

                    </Form>
                    <Button onClick={handleForm} className='my-2 w-100' type='submit' color='primary'>Login</Button><br></br><br></br>
                   
                </Col>
                </Row>
            
            </Container>
   
        </div>
    )
}

export default Login;
