import React, { Component, useState }  from 'react';
import { Card, Button,Carousel } from 'react-bootstrap';
import { useEffect } from 'react';

import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";
import base_url from '../../api/bootapi';
import axios from 'axios';





class VendorHome extends Component<any, any> {
    constructor(props:any) {
        super(props);
    }

    
    // let [productData,setProductData]=useState({
    //     result: [],
    //     loading: true,
        
    // });
    state = {
        result: [],
        loading: true,
        id: localStorage.getItem("userId_session")
    }

    async componentDidMount(){
        
        console.log(this.state.id)
        //axios.get(`${base_url}product/vendor/${this.state.id}`).then(
        axios.get(`${base_url}products`).then(

            (response)=>{
                this.setState({
                    result: response.data,
                    loading: false,
                })
            },(error)=>{
                console.log("error");
                let res:string[]=Object.values(error.response.data);
                let errorMsg:string="";

                for(let i=0;i<res.length;i++){
                    errorMsg+=res[i];
                    errorMsg+="\n"
                }
                
                  alert(errorMsg);
                
                
                
                
            }
        );
    }
   

    // const CardInfo = [
    //     {image: "", title: "Shirt", text: "Full Sleeve"},
    //     {image: "", title: "Pant", text: "Blue Jeans"},
    //     {image: "", title: "T-Shirt", text: "Polo"},
    //     {image: "", title: "Punjabi", text: "Long"},
    // ]

    // const RenderCard = (card: any, index: any) => {
    //     return(
    //         <Card style={{ width: '18rem' }} key={index} className="box">
    //         <Card.Img variant="top"  src={card.image}/>
    //         <Card.Body>
    //             <Card.Title>{card.title}</Card.Title>
    //             <Card.Text>{card.text}</Card.Text>
    //             <Button variant="primary" href=''>Edit</Button>
    //         </Card.Body>
    //         </Card>

    //     )
    // };


    
   
    render() {
        var resultTable;
     
        if(this.state.loading){
            resultTable = <h1>Loading...</h1>
        }
        else {
            resultTable = this.state.result.map((item : any) => {
                return(
                    <div className="col-lg-3 mb-5">
                        <Card style={{ width: '18rem' }} className="box">
                            <Card.Img variant="top" src={"data:image/png;base64,"+item.thumbnail} style={{height: "180px", width: "100%"}}/>
                            <Card.Body>
                                <Card.Title>{item.productName}</Card.Title>
                                {/*<Card.Text>Lorem Ipsum Telle Amore</Card.Text>*/}
                                <Button hidden={item.vendor.id == localStorage.getItem("userId_session") ? false : true}
                                    variant="primary" href={`/vEditProducts/`+localStorage.getItem("email")+`/`+item.productId}
                                >
                                    Edit
                                </Button>
                                <Link to={`/product/productDetails/`+item.productId}>

                                    <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })
        }

        var imagePath = "https://www.w3schools.com/html/img_girl.jpg";
        return (
            <div>
                <div className="container">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                /*src="holder.js/800x400?text=First slide&bg=373940"*/
                                src="https://www.w3schools.com/html/img_girl.jpg"
                                style={{height: "365px", width: "100%"}}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                /*src="holder.js/800x400?text=Second slide&bg=282c34"*/
                                src="https://www.w3schools.com/html/img_girl.jpg"
                                style={{height: "365px", width: "100%"}}
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                /*src="holder.js/800x400?text=Third slide&bg=20232a"*/
                                src="https://www.w3schools.com/html/img_girl.jpg"
                                style={{height: "365px", width: "100%"}}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodore cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <br/>
                <div className="container">
                    <div className="row justify-content-lg-start">
                        {resultTable}
                    </div>
                </div>
            </div>
       )
        
    }
}
/*return (
        <div className='container'>
           {/*{CardInfo.map(RenderCard)}*///}

    /*        <div className="row justify-content-lg-start">
                <div className="col-lg-3 mb-5">
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Img variant="top" src="https://www.w3schools.com/html/img_girl.jpg" style={{height: "180px", width: "100%"}}/>
                        <Card.Body>
                            <Card.Title>Jeans</Card.Title>
                            <Card.Text>Lorem Ipsum Telle Amore</Card.Text>
                            <Button variant="primary" href=''>Edit</Button>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-3 mb-5">
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Img variant="top" src="https://www.w3schools.com/html/img_girl.jpg" style={{height: "180px", width: "100%"}}/>
                        <Card.Body>
                            <Card.Title>Jeans</Card.Title>
                            <Card.Text>Lorem Ipsum Telle Amore</Card.Text>
                            <Button variant="primary" href=''>Edit</Button>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-3 mb-5">
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Img variant="top" src="https://www.w3schools.com/html/img_girl.jpg" style={{height: "180px", width: "100%"}}/>
                        <Card.Body>
                            <Card.Title>Jeans</Card.Title>
                            <Card.Text>Lorem Ipsum Telle Amore</Card.Text>
                            <Button variant="primary" href=''>Edit</Button>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-3 mb-5">
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Img variant="top" src="https://www.w3schools.com/html/img_girl.jpg" style={{height: "180px", width: "100%"}}/>
                        <Card.Body>
                            <Card.Title>Jeans</Card.Title>
                            <Card.Text>Lorem Ipsum Telle Amore</Card.Text>
                            <Button variant="primary" href=''>Edit</Button>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-lg-3 mb-5">
                    <Card style={{ width: '18rem' }} className="box">
                        <Card.Img variant="top" src="https://www.w3schools.com/html/img_girl.jpg" style={{height: "180px", width: "100%"}}/>
                        <Card.Body>
                            <Card.Title>Jeans</Card.Title>
                            <Card.Text>Lorem Ipsum Telle Amore</Card.Text>
                            <Button variant="primary" href=''>Edit</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )*/
 
export default VendorHome;