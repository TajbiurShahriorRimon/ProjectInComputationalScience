import React, { useState } from 'react';
import logo from './logo.svg';
//import '../../App.css';
import {Button,Form,FormGroup,Label,Container,Input,Row,Col,Table,FormFeedback} from "reactstrap";
import { group } from 'console';
import { useEffect } from 'react';
import base_url from '../../api/bootapi';
import axios from 'axios';
import events from "node:events";
import { useParams } from 'react-router-dom';

/* TODO
1) Response message misbehaves somtimes
 */



function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

function EditProduct2(props:any){

    const[imageBase64String,setImageBase64String]=useState("");
    const [input, setInput] = useState(Math.random().toString());
    useEffect(()=>{
     //   getAllCategory();
        getProductDetails();
  
        
    },[]);

    const [category,setCategory] = useState([]);
    const [productDetails,setProductDetails]=useState([]);

    const getAllCategory = () => {
        axios.get(`${base_url}category`).then(
            (response) => {
                console.log(response.data);
                setCategory(response.data);

            },
            (error) => {

            }

        );

    };

    const getProductDetails = () => {
        console.log(id)
        axios.get(`${base_url}product/${id}`).then(
            (response) => {
                console.log(response.data);
                products=response.data
                console.log(products);
                //setCategory(response.data);

            },
            (error) => {

            }

        );

    };
    type VendorParams={
        mail:string;
        id:string

     };
    
    const { mail } = useParams<VendorParams>();
    const { id } = useParams<VendorParams>();
    let vendorMail:string=""
    // const [vendorMail,setVendorMail]=useState({
    //     mail:"" //for multiple selected photo
    // });
    

    let [user,setUser]=useState({
        name:"",
        mail:"",
        phone:"",
        address:"",
        gender:"male",
        type:"vendor"
        
    });
    let [vendorOb,setVendor]=useState({
        id:"",
        registrationNumber:"",
        shopPhone:"",
        shopAddress:"",
        shopName:"",
        mail:user
        
    });
    let [products,setProducts]=useState({
        productName:"",
        price:"",
        //categoryId:"", //changes made
        category: {
            categoryId: ""
        },
        vendor:vendorOb,
        description:"",
        photoUrl:"",
        thumbnail: "", //used to set the photo blob path of the selected photo
        otherImage : [] //for multiple selected photo
    });
    const AddPhoto = (e:any) => {
        let reader= new FileReader();
        let image = e.target.files[0];
        //tested code, probably isn't being used. will dlt later
        if(image){
            reader.readAsDataURL(image);
            reader.onload=()=>{
                let base64:any= reader.result;
                setImageBase64String(base64)
                console.log(imageBase64String)
            };
            reader.onerror=function(error){
                console.log(error)
            }
        }
        //ends here
        setProducts({
            ...products,
            thumbnail: image,
            photoUrl: URL.createObjectURL(image) //displays the image in the image box
        });
        e.preventDefault();
    }

    const AddOtherImages = (e:any) => {
        let images = e.target.files;
        setProducts({
            ...products,
            otherImage: images
        });
    }
    
    

    const handleForm= (e:any)=>{
        console.log(products);
        const formData = new FormData();
         formData.append('file',products.thumbnail)
        // console.log(products.thumbnail)
        // postDataToServer(JSON.stringify(products));
        products.thumbnail=""
        console.log(products.thumbnail)
        products.vendor=vendorOb;
        getUserFromServer(mail);
        
        setTimeout(() => {  getVendorFromServer(user.mail); }, 2000);
        //posting data to server
        //posting product
        setTimeout(() => { products.vendor =vendorOb; }, 3000);
        
        setTimeout(() => {  postDataToServer(JSON.stringify(products)); }, 3000);
        
        setTimeout(() => {  postImageToServer(formData); }, 5000);
        
        
        
         
        e.preventDefault();
    }

    //function to post data on server
    const postDataToServer=(data:any)=>{
        console.log(data);
        axios.post(`${base_url}addProducts`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                    alert("Success");
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

    
    // const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // }
    const postImageToServer=(data:any)=>{
        console.log("Image");
        axios.post(`${base_url}addImage`,data,{
           }).then(
            (response)=>{
                    //alert(response.data);
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

    const getUserFromServer=(data:any)=>{
        
        axios.post(`${base_url}getUser`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                   
                    user =response.data
                    console.log(user.mail);
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

    const  getVendorFromServer=(data:any)=>{
        console.log(data);
        axios.post(`${base_url}getVendorIdByUserMail`,data,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                
                    console.log(response.data);
                    vendorOb=response.data;
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
        <div onLoad={getProductDetails}>
            <Container >
            <Row className='justify-content-center my-5'>
                <Col md={4}>
                    <Form onSubmit={handleForm} >
                            <Label className="form-label my-2" for="name">
                                Product Name
                            </Label>
                            
                            <Input 
                                id="productName"
                                name="productName"
                                placeholder="Enter Product Name"
                                type="text"
                                className='form-control'
                                onLoad={getProductDetails}
                                value={products.productName}
                                onChange={(e)=>{
                                    setProducts({...products,productName:e.target.value})
                                }}
                            >
                                
                                {
                                    productDetails.map((item : any) => (
                                        <label>{item.productName}</label>
                                    ))
                            }
                            </Input>
                                

                            <Label className='form-label my-2' for="price">
                                Price
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                placeholder="Enter Product Price"
                                type="text"
                                className='form-control'
                                value={products.price}
                                onChange={(e)=>{
                                    setProducts({...products,price:e.target.value})
                                }}
                            />

                            <Label className='form-label my-2' for="description">
                                Description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Enter Product Description"
                                type="text"
                                className='form-control'
                                style={{width: 400, height: 100}}
                                onChange={(e)=>{
                                    setProducts({...products,description:e.target.value})
                                }}
                            />

                            <Label className='form-label my-2' for="category">
                                Category
                            </Label>
                            <select className="form-select" aria-label="Default select example" id="category" onChange={(e)=>{
                                    setProducts({...products,
                                        //categoryId:e.target.value //changes made
                                        category: {
                                            categoryId: e.target.value
                                        }
                                    })
                                }}>
                                <option selected>Select Category</option>
                                {
                                    category.map((item : any) => (
                                        <option key={item.categoryId} value={item.categoryId}>
                                            {item.categoryName}
                                        </option>
                                    ))
                                }
                            </select>
                        <Label className='form-label my-2' for="photo">
                        Thumbnail
                        </Label>
                        <div>
                            <img src={products.photoUrl} id="photoSrc" style={{height: 200, width: 300}}/>
                            <Input
                                accept="image/*"
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                className='form-control'
                                onChange={AddPhoto}
                            />
                        </div>

                        {/*<Label className='form-label my-2' for="otherImage">
                            Other Images
                        </Label>
                        <Input
                            accept="image/*"
                            id="otherImage"
                            name="otherImage"
                            type="file"
                            className='form-control'
                            multiple
                            onChange={AddOtherImages}
                        />*/}
                            <Button className='my-2 w-100' type='submit' color='primary'>Save</Button>
                    </Form>
                   
                </Col>
                </Row>
            
            </Container>
   
        </div>
    )}
    
                    
 
                
export default EditProduct2;
