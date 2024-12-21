import React, {Component, useEffect, useState} from "react";
import {Button, Card } from "react-bootstrap";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {ButtonGroup} from "reactstrap";
import StarRatings from "react-star-ratings";
import axios from "axios";
import base_url from "../../api/bootapi";
import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";
import Modal from "react-bootstrap/Modal";

class SiteProductReviews extends Component<any, any>{
    constructor(props:any) {
        super(props);
    }

    state = {
        //data: (<button>hello</button>),
        //test: "12",
        show: false,
        result: [],
        productName: "",
        loading: false,
        customerReview: {
            value: "",
            rating: 0
        },
        reviewBtn: "",
        reviewModal: "",

        resultProductImg: {
            productName: "",
            thumbnail: "",
        }
    }

    async componentDidMount() {
        var id = window.location.pathname.split("/").pop();
        const resp = await axios.get(`${base_url}product/getReviewsAndRatings/${id}`);
        //console.log(resp);

        if (resp.status === 200){
            if(resp.data.length > 0) {
                this.setState({
                    result: resp.data,
                    productName: resp.data[0].product.productName,
                    loading: false,
                })
            }
        }
        if(localStorage.getItem("userId_session") != null) {
            var customer_id = localStorage.getItem("userId_session") //1; //session_userId
            var resultData = await axios.get(`${base_url}review/checkCustomerReviewForProduct/${id}/${customer_id}`)

            //The following line executes if it is found that customer has given a review
            if (resultData.status == 200) {
                this.setState({
                    customerReview: resultData.data,
                    reviewBtn: (
                        <button className="btn-outline-info btn btn-outline-danger" style={{float: "right"}}
                                onClick={this.handleShow}
                                hidden={localStorage.getItem("userType_session") == "customer" ? false : true}
                        >
                            Show My Review
                        </button>
                    )
                })
                //console.log("reviewStatus");
                //console.log(this.state.customerReview.value);
            }
            //the customer did not give a review
            else { //status code is 204... No Content
                //Now it has to be checked if the customer actually bought the product and got the delivery
                var resultData = await axios.get(`${base_url}order/checkSold/${id}/${customer_id}`);
                console.log(resultData);
                if (resultData.status == 200) {
                    //The customer bought product but did not give a review
                    if (resultData.data.length > 0) {
                        this.setState({
                            reviewBtn: (
                                <Link to={"/product/customer/giveReview/" + id}
                                      hidden={localStorage.getItem("userType_session") == "customer" ? false : true}
                                >
                                    <button className="btn-outline-info btn btn-outline-danger"
                                            style={{float: "right"}}>
                                        Give Review
                                    </button>
                                </Link>
                            )
                        })
                    }
                }
            }
        }

        //We have to get the product Image
        const respProduct = await axios.get(`${base_url}product/${id}`);
        console.log(respProduct);
        if (respProduct.status === 200){
            this.setState({
                resultProductImg: respProduct.data
            })
        }

        console.log(this.state.resultProductImg)

    }

    handleShow = () =>{
        this.setState({
            show: true
        })
    }

    handleClose = () =>{
        this.setState({
            show: false
        })
    }

    render() {

        var resultTable;

        if(this.state.loading){
            resultTable = <h1>Loading...</h1>
        }
        else {
            if (this.state.result.length == 0){
                resultTable = <h2>No Review...</h2>
            }
            else {
                resultTable = this.state.result.map((item: any) => {
                    return (
                        <div key={item.id}>
                            <Card>
                                <Card.Header>
                                    <strong>{item.customer.mail.name}</strong><br/>
                                    Rating: {item.rating} <br/>
                                    <StarRatings
                                        rating={item.rating}
                                        starDimension="25px"
                                        starSpacing="5px"
                                        starRatedColor="#cee009"
                                    />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title></Card.Title>
                                    <Card.Text>
                                        {item.value}
                                    </Card.Text>
                                </Card.Body>
                            </Card> <br/>
                        </div>
                    )
                })
            }
        }

        var st = {
            height: "100vw",
            backgroundImage: "url("+"https://inspirationhut.net/wp-content/uploads/2013/05/201.png"+")",
            backgroundSize: "cover", backgroundRepeat: 'no-repeat'
        }
        var imagePath = "https://www.w3schools.com/html/img_girl.jpg";
        var thumb = "data:image/png;base64,"+this.state.resultProductImg.thumbnail;
        return(
            <div style={st}>
            <div className='container'>
                <div className="form-control">
                    <div className="row">
                        {this.state.reviewBtn}
                        <div className="col-md-5">
                            <div style={{display: 'flex', justifyContent:'center', alignItems:'center', backgroundColor: "mistyrose"}}>
                                <TransformWrapper initialScale={1}>
                                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                        <React.Fragment>
                                            <TransformComponent>
                                                <img /*src="https://www.w3schools.com/html/img_girl.jpg" alt="test"*/
                                                    src={this.state.resultProductImg.thumbnail == null ? imagePath :
                                                        thumb
                                                    }
                                                     style={
                                                         {  height: 300,
                                                             width: 250
                                                         }
                                                     }
                                                />
                                            </TransformComponent>
                                            <div>
                                                <ButtonGroup className="me-2" aria-label="Second group">
                                                    <Button onClick={() => zoomIn()} className="btn-dark btn">+</Button>
                                                    <Button onClick={() => zoomOut()} className="btn btn-dark">-</Button>
                                                    <Button onClick={() => resetTransform()} className="btn btn-outline-danger">X</Button>
                                                </ButtonGroup>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </TransformWrapper>
                            </div> <br/>
                            <h4>{this.state.productName}</h4>
                        </div>
                        <div className="col-md-7" style={{overflow: "auto", height: 400}}>
                            {/*<Card>
                                <Card.Header>
                                    <strong>Asif Ahmed</strong><br/>
                                    Rating: 3.7 <br/>
                                    <StarRatings
                                        rating={3.7}
                                        starDimension="25px"
                                        starSpacing="5px"
                                        starRatedColor="#cee009"
                                    />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title></Card.Title>
                                    <Card.Text>
                                        With supporting text below as a natural lead-in to additional content.
                                        With supporting text below as a natural lead-in to additional content.
                                        With supporting text below as a natural lead-in to additional content.
                                        With supporting text below as a natural lead-in to additional content.
                                    </Card.Text>
                                    <button style={{float: "right"}}
                                            className="btn-danger rounded-end btn"
                                    >
                                        Hello button
                                    </button>
                                </Card.Body>
                            </Card> <br/>*/}
                            {resultTable}
                        </div>
                    </div>
                    <div className="row">
                        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                                <Modal.Title>
                                    <StarRatings
                                        rating={this.state.customerReview.rating}
                                        starDimension="25px"
                                        starSpacing="5px"
                                        starRatedColor="#cee009"
                                    />
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{this.state.customerReview.value}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default SiteProductReviews