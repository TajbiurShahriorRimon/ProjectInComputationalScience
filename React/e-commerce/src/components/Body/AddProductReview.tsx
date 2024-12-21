import React, {Component} from "react";
import {Badge} from "react-bootstrap";
import { Rating } from 'react-simple-star-rating';
import {Link} from "react-router-dom";
import axios from "axios";
import base_url from "../../api/bootapi";
import un_auth from "../../unAuthRedirect/unAuth";

class AddProductReview extends Component<any, any>{
    state = {
        initialRating: 0,
        review: "",
        reviewDetailsErr: "",
        ratingErr: "",

        reviewAndRating: {
            id: "",
            rating: 0,
            value: "",
            customer: {
                id: localStorage.getItem("userId_session")//0 //Local_Storage session_userId
            },
            product: {
                productId: window.location.pathname.split("/").pop()
            }
        },

        result: {
            productName: "",
            price: "",
            thumbnail: "",
            description: "",
            status: "",
            category: { //another object
                categoryName: "",
            },
            vendor: {
                shopName: "",
            }
        },
    }

    addRating = (rate: number) => {
        this.setState({
            initialRating: rate
        })
        //alert(rate/20);
    }

    handleInput = (e: any) => {
        this.setState({
            review : e.target.value
        })
    }

    click = async (e: any) => {
        //window.location.replace("/login");
        var isValid = true;
        if(this.state.review == ""){
            isValid = false;
            this.setState({
                reviewDetailsErr: "Review Description cannot be empty..."
            })
            return;
        }
        else {
            this.setState({
                reviewDetailsErr: ""
            })
        }
        if(this.state.initialRating == 0){
            isValid = false;
            this.setState({
                ratingErr: "Give a rating..."
            })
            return;
        }
        else {
            this.setState({
                ratingErr: ""
            })
        }

        if (isValid == true){
        //if(this.state.ratingErr == "" && this.state.reviewDetailsErr == ""){
            var productId = window.location.pathname.split("/").pop();
            var starRating = (this.state.initialRating)/20;

            this.state.reviewAndRating.value = this.state.review;
            this.state.reviewAndRating.rating = starRating;
            this.state.reviewAndRating.customer.id = localStorage.getItem("userId_session"); //Local_Storage

            const resp = await axios.post(`${base_url}reviewAndRating`, this.state.reviewAndRating);
            if(resp.status == 201){
                alert("Review Added");
                window.location.replace("/product/allReviews/"+window.location.pathname.split("/").pop())
            }
        }
    }

    async componentDidMount() {
        var prod_id = window.location.pathname.split("/").pop();
        if(localStorage.getItem("userId_session") != null) {
            var customer_id = localStorage.getItem("userId_session") //1; //session_userId
            var resultData = await axios.get(`${base_url}review/checkCustomerReviewForProduct/${prod_id}/${customer_id}`)

            //The following line executes if it is found that customer has given a review
            if (resultData.status == 200) {
                window.location.href = un_auth;
            }
            //the customer did not give a review
            else { //status code is 204... No Content
                //Now it has to be checked if the customer actually bought the product and got the delivery
                var resultData = await axios.get(`${base_url}order/checkSold/${prod_id}/${customer_id}`);
                console.log(resultData);
                if (resultData.status == 200) {
                    //The customer bought product but did not give a review
                    /*if (resultData.data.length > 0) {
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
                    }*/
                }
            }
        }

        const resp = await axios.get(`${base_url}product/${prod_id}`);
        console.log(resp);
        if (resp.status === 200) {
            this.setState({
                result: resp.data,
                loading: false,
            })
        }
        //if the product does not exists then redirect to login page
        else if(resp.status == 204){
            window.location.href = un_auth;
        }
    }

    /*handleText = (e: any) => {
        //e.preventDefault();
        this.setState({
            review : e.target.value
        })
    }*/

    render() {
        const imagePath = "https://www.w3schools.com/html/img_girl.jpg";
        var thumb = "data:image/png;base64,"+this.state.result.thumbnail;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-8">
                        <div className="form-control" style={{backgroundColor: "#e4ede6"}}>
                            <div className="row">
                                <div className="col-md-1">
                                    <div className="form-group">
                                        <img src={this.state.result.thumbnail == null ? imagePath : thumb}
                                             style={
                                                 {  height: 70,
                                                     width: 50
                                                 }
                                             }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">{this.state.result.productName}</label>
                                    <br/> <Badge>{this.state.result.category.categoryName}</Badge>
                                </div>
                                <div className="col-md-4">
                                    <br/>
                                    <div>
                                        <Rating onClick={this.addRating} //ratingValue={this.state.initialRating}
                                                initialValue={this.state.initialRating}
                                                allowFraction={true}
                                                transition={true}
                                        />
                                    </div>
                                    <div className="text-danger">
                                        {this.state.ratingErr}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div><br/><br/>
                                    <textarea name="message" id="message" onChange={this.handleInput}
                                          cols={10} rows={5}
                                          placeholder="Enter Review Details Here..."
                                          value={this.state.review}
                                          style={{width: 400, height: 100}}
                                    >
                                    </textarea>
                                    <div className="text-danger">
                                        {this.state.reviewDetailsErr}
                                    </div>
                                    <br/>
                                    <button onClick={this.click} className="btn-dark btn">Submit Review</button>
                                </div>
                            </div>
                            <div>
                                <br/><br/>
                                <Link to={`/product/allReviews/${window.location.pathname.split("/").pop()}`}>
                                    <button className="btn btn-secondary">Check All Reviews</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProductReview;