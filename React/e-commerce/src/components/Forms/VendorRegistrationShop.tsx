import React, { useState } from 'react';
import {Button,Form,FormGroup,Label,Container,Input,Row,Col,FormFeedback} from "reactstrap";
import { group } from 'console';
import { useEffect } from 'react';
import base_url from '../../api/bootapi';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';



export default function VendorRegistrationShop(){

    
    useEffect(()=>{

    },[]);

    
   
    let [userOb,setUser]=useState({
        name:"",
        mail: window.location.pathname.split("/").pop(),
        phone:"",
        address:"",
        gender:"male",
        type:"vendor"
        
    });
    let [vendor,setVendor]=useState({
        user:userOb,
        shopPhone:"",
        shopAddress:"",
        registrationNumber:"",
        shopName:"",

        mail: userOb
    });

    const [errorShop,setErrorShop]=useState({
        registrationNumberErr: "",
        shopPhoneErr: "",
        shopAddressErr: "",
        shopNameErr: ""
    });

    const navigate = useNavigate();

    type VendorParams={
        mail:string;
    };
    
    const { mail } = useParams<VendorParams>();
    
    
   
    const handleForm=(e:any)=>{
       ;
        
        
        console.log(mail);
        postMailToServer(mail);
        console.log(vendor.user);
       // console.log(vendor.user);
        setTimeout(() => {  postVendorToServer(JSON.stringify(vendor)); }, 5000);
        
        e.preventDefault();
    }

    //function to post data on server
    const postVendorToServer=(data:any)=>{
        console.log(data);
        axios.post(`${base_url}uVendorReg`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                //alert(response.data);
                navigate(`/sLoginReg/${vendor.mail.mail}`);
            },(error)=>{
                //console.log("error");
                let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";

                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  //alert(errorMsg);
                
                setErrorShop({
                    registrationNumberErr: error.response.data.registrationNumber,
                    shopPhoneErr: error.response.data.shopPhone,
                    shopAddressErr: error.response.data.shopAddress,
                    shopNameErr: error.response.data.shopName,
                })
                
                
            }
        );
    };

    //use
    const postMailToServer=(data:any)=>{
        
        console.log(data);
        axios.post(`${base_url}getUser`,data).then(
            (response)=>{
                setVendor({...vendor,user:response.data})
               
            },(error)=>{
                console.log("error");
                let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";

                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  //alert(errorMsg);
                
                
                
                
            }
        );
    };
    return(
        <div >
            <Container >
            <Row className='justify-content-center my-5'>
                <Col md={4}>
                    <Form onSubmit={handleForm}>
                            
                            <Label className='form-label my-2' for="shopName">
                                Shop Name
                            </Label>
                            <Input
                                id="shopName"
                                name="shopName"
                                type="text"
                                className='form-control'
                                onChange={(e)=>{
                                    setVendor({...vendor,shopName:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {errorShop.shopNameErr == "" ? "" : errorShop.shopNameErr}
                            </div>

                            <Label className='form-label my-2' for="shopPhone">
                               Shop Phone
                            </Label>
                            <Input
                                id="shopPhone"
                                name="shopPhone"
                                placeholder="Phone Number"
                                type="text"
                                className='form-control'
                                onChange={(e)=>{
                                    setVendor({...vendor,shopPhone:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {errorShop.shopPhoneErr == "" ? "" : errorShop.shopPhoneErr}
                            </div>
                            

                            <Label className='form-label my-2' for="regNumber">
                               Shop Registration Number
                            </Label>
                            <Input
                                id="regNumber"
                                name="regNumber"
                                placeholder="Phone Number"
                                type="text"
                                className='form-control'
                                onChange={(e)=>{
                                    setVendor({...vendor,registrationNumber:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {errorShop.registrationNumberErr == "" ? "" : errorShop.registrationNumberErr}
                            </div>

                            <Label className='form-label my-2' for="shopAddress">
                              Shop Address
                            </Label>
                            <textarea className="form-control styleTextarea"  id="shopAddress" 
                             onChange={(e)=>{
                                setVendor({...vendor,shopAddress:e.target.value})
                            }}
                            ></textarea>
                            <div className="text-danger">
                                {errorShop.shopAddressErr == "" ? "" : errorShop.shopAddressErr}
                            </div>
                            
                            <Button className='my-2 w-100' type='submit' color='primary'>Submit</Button>
                    </Form>
                   
                </Col>
                </Row>
            
            </Container>
   
        </div>
    )
}