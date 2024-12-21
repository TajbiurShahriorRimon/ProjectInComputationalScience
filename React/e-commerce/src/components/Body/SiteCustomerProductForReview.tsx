import React, {Component, useCallback, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Badge} from "react-bootstrap";
import { Button } from "reactstrap";
import {useNavigate, Router, Link, Navigate} from "react-router-dom";
import StarRatings from "react-star-ratings";
import axios from "axios";
import base_url from "../../api/bootapi";

class SiteCustomerProductForReview extends Component<any, any>{
    state = {
        rend: "",
        show: false,
        btn: (
            <button className="btn btn-dark">Hello world</button>
        ),

        result: {
            productName: "",
            price: "",
            category: { //another object
                categoryName: "",
            },
            vendor: {
                shopName: "",
            }
        },
        loading: true,
        urlParameter: "",
        df: "dsd"
    }

    constructor(props : any) {
        super(props);
    }

    async componentDidMount() {
        console.log(window.location.pathname.split("/").pop());
        var id = window.location.pathname.split("/").pop();
        const resp = await axios.get(`${base_url}product/${id}`);

        console.log(resp.data);
        if (resp.status === 200){
            this.setState({
                result: resp.data,
                loading: false,
                urlParameter: id
            })
        }
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

    alertPop = () => {
        alert("saved...");
    }

    render() {
        return(
            <div className="container">
                {/*<Navigate to={""} state={null}/>*/}
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-8">
                        <div className="form-control" style={{height: 100, backgroundColor: "#e4ede6"}}>
                            <div className="row">
                                <div className="col-md-1">
                                    <div className="form-group">
                                        <img src="https://www.w3schools.com/html/img_girl.jpg" alt="test"
                                             style={
                                                 {  height: 70,
                                                     width: 50
                                                 }
                                             }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Jeans Chino Cut</label>
                                    <br/> <Badge>Jeans</Badge>
                                </div>
                                <div className="col-md-4">
                                    <br/>
                                    <Link to={"/product/customer/giveReview/2"}>
                                    <button style={{width: 200}} className="btn-outline-info rounded-3 btn">
                                        <strong>Give Review</strong>
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div> <br/>
                    </div>

                    <div className="col-md-3">
                    </div>
                    <div className="col-md-8">
                        <div className="form-control" style={{height: 100, backgroundColor: "#e4ede6"}}>
                            <div className="row">
                                <div className="col-md-1">
                                    <div className="form-group">
                                        <img src="https://www.w3schools.com/html/img_girl.jpg" alt="test"
                                             style={
                                                 {  height: 70,
                                                     width: 50
                                                 }
                                             }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Black T-Shirt</label>
                                    <br/> <Badge>Shirt</Badge>
                                </div>
                                <div className="col-md-4">
                                    <br/>
                                    <button onClick={this.handleShow} style={{width: 200}} className="btn-outline-info rounded-3 btn">
                                        <strong>Check Your Review</strong>
                                    </button>
                                </div>
                            </div>
                        </div> <br/>
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                        <Modal.Title>
                            <StarRatings
                                rating={3.7}
                                starDimension="25px"
                                starSpacing="5px"
                                starRatedColor="#cee009"
                            />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Link to={"/product/customer/giveReview/2"}>
                        <Button variant="primary">
                            Save Changes
                        </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
export default SiteCustomerProductForReview;