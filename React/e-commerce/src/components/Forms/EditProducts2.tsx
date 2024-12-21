import React, {Component} from "react";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {Button,Form,FormGroup,Label,Container,Input,Row,Col,Table,FormFeedback} from "reactstrap";
import {ImCart, ImHeart} from "react-icons/im";
import {Badge} from "reactstrap";
import NumericInput from "react-numeric-input";
import StarRatings from 'react-star-ratings';
import axios from "axios";
import base_url from "../../api/bootapi";
import {Link} from "react-router-dom";
import { any } from "prop-types";



class EditProduct extends Component<any, any>{
    constructor(props : any) {
        super(props);
    }

    state={
        product:{
        productId:"",
        productName:"",
        price:"",
        //categoryId:"", //changes made
        category: {
            categoryId: "",
            categoryName:"",
            status:""
        },
        vendor:{
            id:"",
            registrationNumber:"",
            shopPhone:"",
            shopAddress:"",
            shopName:"",
            user:{
                name:"",
                mail:"",
                phone:"",
                address:"",
                gender:"",
                type:""
            }
        },
        description:"",
        thumbnail: "",
        
        },
        categories:["",""],
        photoUrl:"data:image/png;base64,",

        categoryId: "",


        priceErr: "",
        descriptionErr: ""
    }

   

    async componentDidMount() {
        //console.log("2222");
        let params:string[] = window.location.pathname.split("/");
        let id=params.pop()!;

        const resp = await axios.get(`${base_url}product/${id}`)

        console.log(resp.data);
        if(resp.status == 204){
            window.location.href = "/login"
        }

        if(resp.data.vendor.id != localStorage.getItem("userId_session")){
            alert('wrong product');
            window.location.href = "/login";
        }

        await this.setState({
            product:resp.data
        });
        console.log(this.state.product);
        this.setState({
            photoUrl:this.state.photoUrl+this.state.product.thumbnail
        })
        //get all categories from server
        const resp2 = await axios.get(`${base_url}category`); 

        console.log(resp2.data);
        await this.setState({
            categories:resp2.data
        });

        this.setState({
            categoryId: this.state.product.category.categoryId
        })
    }
    updateProduct=(e:any)=>{
        e.preventDefault();
        var isValid = true
        if(this.state.product.price == ""){
            isValid = false;
            this.setState({
                priceErr: "price cannot be empty"
            })
        }
        else if (!this.state.product.price.toString().match(/^-?[0-9]*[.][0-9]+$/) &&
            !this.state.product.price.toString().match(/^[0-9]+$/))
        {
            isValid = false;
            this.setState({
                priceErr: "only (positive) value is allowed"
            })
        }
        else if(+this.state.product.price < 0){
            isValid = false;
            this.setState({
                priceErr: "(positive) value is allowed"
            })
        }
        else {
            this.setState({
                priceErr: ""
            })
        }

        if(this.state.product.description == ""){
            //alert('dfdfd');
            isValid = false;
            this.setState({
                descriptionErr: "description cannot be empty"
            })
        }
        else {
            this.setState({
                descriptionErr: ""
            })
        }

        if(isValid == true){
            this.addProduct();
        }

    }

    //save product to server
    addProduct = ( )=> {
        
        axios.post(`${base_url}addProducts`,this.state.product,{
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            }}).then(
            (response)=>{
                    alert("Product updated");
                    window.location.href = "/vHome";
                    //save image to server
                    console.log(this.state.product.thumbnail);
                    const formData = new FormData();
                    formData.append('file',this.state.product.thumbnail)
                    console.log(formData.get('file'))
                    this.addImage(formData);
                    
            },(error)=>{
                let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";
                
                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  //alert(errorMsg);
            }
        );
        //alert(this.state.unit);
    }
    //send image to server
    addImage = (data: any) => {
        
        axios.post(`${base_url}updateImage/${this.state.product.productId}`,data).then(
         (response)=>{
                 alert("image updated");
         },(error)=>{
             
             let res:string[]=Object.values(error.response.data);
             let errorMsg:string="";
             
             for(let i=0;i<res.length;i++){
                 errorMsg+=res[i];
                 errorMsg+="\n"
             }
             
               //alert(errorMsg);
         }
     );
    }

    //add image to state after it has been selected
     addPhotoToSTate = (e:any) => {
        let image = e.target.files[0];
        
        console.log(URL.createObjectURL(image))
          this.setState({
            
            thumbnail:image,
            photoUrl:URL.createObjectURL(image)
        });
        console.log(this.state.photoUrl)
        console.log(this.state.product.thumbnail)
    }
    render(){
        var categoryList;
        if (this.state.product.category.status == "active"){
            //alert('haha');
            categoryList = this.state.categories.map((item : any) => (
                <option
                    selected={item.categoryId ==
                    this.state.categoryId ? true : false}
                    key={item.categoryId} value={item.categoryId}
                >
                    {item.categoryName}
                </option>
            ))
        }
        else {
            //alert("dsds");
            categoryList =

                /*<option selected hidden>{this.state.product.category.categoryName}</option>*/
                this.state.categories.map((item : any) => (
                    <option
                        key={item.categoryId} value={item.categoryId}
                    >
                        {item.categoryName}
                    </option>
                ))
        }
        return(
            <div >
            <Container >
            <Row className='justify-content-center my-5'>
                <Col md={4}>
                    <Form  /*onSubmit={this.updateProduct}*/>
                            <Label className="form-label my-2" for="name">
                                Product Name
                            </Label>
                            
                            <Input 
                                id="productName"
                                name="productName"
                                placeholder="Enter Product Name"
                                type="text"
                                className='form-control'
                                defaultValue={this.state.product.productName}
                                disabled={true}
                                onChange={(e)=>{
                                    this.state.product.productName=e.target.value}}
                            >
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
                                value={this.state.product.price}
                                /*onChange={(e)=>{
                                    this.state.product.price=e.target.value}}*/
                                onChange={(e)=>{
                                    /*this.setState({
                                        product: this.state.product
                                    })
                                    this.setState({
                                        product:{
                                            price: e.target.value,
                                            /!*productName: this.state.product.productName,
                                            description: this.state.product.description*!/
                                        }
                                    })*/
                                    //e.preventDefault();
                                    this.setState({
                                        product:{
                                            ...this.state.product,
                                            price: e.target.value
                                        }
                                    })
                                    this.state.product.price = e.target.value
                                    //alert(this.state.product.price)
                                }}
                            />
                            <div className="text-danger">
                                {this.state.priceErr}
                            </div>
                            
                            <Label className='form-label my-2' for="description">
                                Description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Enter Product Description"
                                type="textarea"
                                /*className='form-control'*/
                                value={this.state.product.description}
                                style={{width: 400, height: 100}}
                                onChange={(e)=>{
                                    //e.preventDefault();
                                    //this.state.product.description=e.target.value
                                    /*this.setState({
                                        product:{
                                            description: e.target.value,
                                            /!*productName: this.state.product.productName,
                                            price: this.state.product.price*!/

                                            /!*category: {
                                                categoryId: this.state.product.category.categoryId
                                            }*!/
                                        }
                                    })
                                    this.setState({
                                        product: this.state.product
                                    })*/
                                    this.setState({
                                        product:{
                                            ...this.state.product,
                                            description: e.target.value
                                        }
                                    })
                                    this.state.product.description = e.target.value
                                    //alert(this.state.product.description)
                                }}

                            />
                            <div className="text-danger">
                                {this.state.descriptionErr}
                            </div>

                            <Label className='form-label my-2' for="category">
                                Category
                            </Label>
                            <select className="form-select" aria-label="Default select example" id="category"
                            onChange={(e)=>{
                                e.preventDefault();
                                this.setState({
                                    product:{
                                        ...this.state.product,
                                    }
                                })
                                    this.state.product.category.categoryId=e.target.value
                                }}>
                                {/*<option selected hidden>{this.state.product.category.categoryName}</option>*/}
                                {/*{
                                    this.state.categories.map((item : any) => (
                                        <option
                                            selected={item.categoryId ==
                                                        this.state.categoryId ? true : false}
                                            key={item.categoryId} value={item.categoryId}
                                        >
                                            {item.categoryName}
                                        </option>
                                    ))
                                }*/}
                                {/*{
                                    this.state.product.category.status == "inactive" ?
                                        <option selected={true}
                                                key={this.state.product.category.categoryId}
                                                value={this.state.product.category.categoryId}
                                        >
                                            {this.state.product.category.categoryName}
                                        </option> : this.state.categories.map((item : any) => (
                                            <option
                                                selected={item.categoryId ==
                                                this.state.categoryId ? true : false}
                                                key={item.categoryId} value={item.categoryId}
                                            >
                                                {item.categoryName}
                                            </option>
                                        ))
                                }*/}
                                <option selected={this.state.product.category.status == "inactive" ? true : false}
                                        disabled={this.state.product.category.status == "active" ? true : false}
                                        key={this.state.categoryId}
                                        value={this.state.categoryId}
                                >
                                    {this.state.product.category.status == "inactive" ? this.state.product.category.categoryName :
                                        "Select..."}
                                </option>
                                {this.state.product.category.status == "inactive" ? this.state.categories.map((item : any) => (
                                        <option
                                            selected={item.categoryId ==
                                            this.state.categoryId ? true : false}
                                            key={item.categoryId} value={item.categoryId}
                                        >
                                            {item.categoryName}
                                        </option>
                                    )) : ""
                                }

                                {/*for active category*/}
                                {
                                    this.state.product.category.status == "active" ?
                                        this.state.categories.map((item : any) => (
                                            <option
                                                selected={item.categoryId ==
                                                this.state.categoryId ? true : false}
                                                key={item.categoryId} value={item.categoryId}
                                            >
                                                {item.categoryName}
                                            </option>
                                        )) : ""
                                }
                            </select>
                        <br/>
                            {/* <Input 
                                id="productName"
                                name="productName"
                                placeholder="Enter Product Name"
                                type="text"
                                className='form-control'
                                value={this.state.product.category.categoryName}
                                disabled
                                onChange={(e)=>{
                                    this.state.product.productName=e.target.value}}
                            />
                        <Label className='form-label my-2' for="photo">
                        Thumbnail
                        </Label> */}
                        
                        <div>
                            <img src={this.state.photoUrl} id="photoSrc" style={{height: 200, width: 300}}/>
                            {/*<Input
                                accept="image/*"
                                id="thumbnail"
                                name="file"
                                type="file"
                                className='form-control'
                                onChange={this.addPhotoToSTate}
                            />*/}
                        </div>
                            {/*<Button className='my-2 w-100' type='submit' color='primary'>Save</Button>*/}
                    </Form>
                    <Button onClick={this.updateProduct} className='my-2 w-100' type='button' color='primary'>Save</Button>
                   
                </Col>
                </Row>
            
            </Container>
   
        </div>
        )
    }
}

export default EditProduct;
