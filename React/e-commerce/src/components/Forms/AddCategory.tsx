import React, { useState } from 'react';
import logo from './logo.svg';
//import '../../App.css';
import {Button,Form,FormGroup,Label,Container,Input,Row,Col,FormFeedback} from "reactstrap";
import { group } from 'console';
import { useEffect } from 'react';
import base_url from '../../api/bootapi';
import axios from 'axios';
import events from "node:events";
/* TODO
1) Response message misbehaves somtimes
 */




function AddCategory(props:any){

    
    useEffect(()=>{

    },[]);
    const [category,setCategory]=useState({
        categoryName:"",
        status:"active",
    });

    const [categoryErr,setCategoryErr]=useState({
        categoryNameErr:"",
    });


    const handleForm=(e:any)=>{
        console.log(category);

        
        postDataToServer(JSON.stringify(category));
        e.preventDefault();
    }

    //function to post data on server
    const postDataToServer=(data:any)=>{
        axios.post(`${base_url}addCategory`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                    alert("Success");
                setCategoryErr({
                    categoryNameErr: ""
                })
            },(error)=>{
                
                let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";
                
                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  //alert(errorMsg);
                setCategoryErr({
                    categoryNameErr: errorMsg
                })
            }
        );
    };
    return(
        <div >
            <Container >
            <Row className='justify-content-center my-5'>
                <Col md={4}>
                    <Form onSubmit={handleForm}>
                            <Label className="form-label my-2" for="categoryName">
                                Category Name
                            </Label>
                            <Input 
                                id="categoryName"
                                name="categoryName"
                                placeholder="Enter Category Name"
                                type="text"
                                className='form-control'
                                onChange={(e)=>{
                                    setCategory({...category,categoryName:e.target.value})
                                }}
                            />
                            <div className="text-danger">
                                {categoryErr.categoryNameErr == "" ? "" : categoryErr.categoryNameErr}
                            </div>

                            {/*<Label className='form-label my-2' for="status">
                                Status
                            </Label>
                            <select className="form-select" aria-label="Default select example" id="status" onChange={(e)=>{
                                    setCategory({...category,status:e.target.value})
                                }}>
                                <option selected value="active">Active</option>
                                <option disabled={true} value="inactive">Inactive</option>
                            </select>*/}

                            
                            <Button className='my-2 w-100' type='submit' color='primary'>Save</Button>
                    </Form>
                   
                </Col>
                </Row>
            
            </Container>
   
        </div>
    )
}

export default AddCategory;
