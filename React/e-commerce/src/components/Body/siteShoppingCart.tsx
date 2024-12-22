import React, {Component, useEffect, useState} from "react";
import {Card, Carousel, Nav, Navbar,} from "react-bootstrap";
import {CgNotes, CgProfile, CgTrash} from "react-icons/cg";
import { MdShoppingCartCheckout, MdPayment } from "react-icons/md";
import {Button} from "reactstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";
import base_url from "../../api/bootapi";

class SiteShoppingCart extends Component<any, any>{
    constructor(props:any) {
        super(props);
    }

    state = {
        result: [],
        resultData: [],
        totalPrice: "",
        loading: true,
        //below object is used to place order
        orderData: {
            customer: {
                id: localStorage.getItem("userId_session") //1 //session_userId local_storage
            },
            totalPrice: 0,
            date: "dummy date",
            status: "pending"
        }
    }

    async componentDidMount() {
        const resp = await axios.get(`${base_url}products`);
        //console.log(resp);
        if (resp.status === 200){
            this.setState({
                result: resp.data,
                loading: false,
            })
        }

        if (localStorage.getItem("shoppingCart") != null) {
            var ara = JSON.parse(localStorage.getItem("shoppingCart") || '{}');
            console.log("ara: " + ara);
            var i, totalProductPrice = 0;
            for(i = 0; i < ara.length; i++){
                totalProductPrice += ara[i].product_price * ara[i].unit;
            }
            this.setState({
                resultData: ara,
                totalPrice: totalProductPrice,
                loading: false,
            })
            this.state.orderData.totalPrice = totalProductPrice;
        }
    }

    removeProductFromCart = (prodId: any) => {
        var array = JSON.parse(localStorage.getItem("shoppingCart") || '{}');
        //If there is only one product then remove the whole session
        if(array.length == 1){
            array.splice(i, 1);
            this.setState({
                resultData: [],
                loading: false,
                totalPrice: ""
            })
            localStorage.removeItem("shoppingCart"); //removing the shopping cart session
            return;
        }
        console.log(array);
        var i, j;
        var totalProductPrice = 0;
        //If there is more than one product then check the array that which product is going to be removed
        for(i = 0; i < array.length; i++){
            if(array[i].product_id == prodId){
                array.splice(i, 1); //removing the object from the array
                //Now update the product price
                for(j = 0; j < array.length; j++){
                    totalProductPrice += array[j].product_price * array[j].unit;
                }
                //console.log("after removing");
                console.log(array);
                this.setState({
                    resultData: array,
                    loading: false,
                    totalPrice: totalProductPrice,
                })
                this.state.orderData.totalPrice = totalProductPrice;
                localStorage.setItem("shoppingCart", JSON.stringify(array));
                console.log(JSON.parse(localStorage.getItem("shoppingCart") || '{}'))
                break;
            }
        }
    }

    orderProduct = async () => {
        const resp = await axios.post(`${base_url}order`, this.state.orderData);
        //console.log(resp);
        var order_id = resp.data; //getting the order_id which will be used for insertion for sales items
        if(resp.status == 201){
            //alert("Success");
            await this.salesItem(order_id);
        }
    }

    salesItem = async (order_id: any) => {
        var array = JSON.parse(localStorage.getItem("shoppingCart") || '{}');
        for(let i = 0; i < array.length; i++){
            array[i].order.id = order_id;
        }
        const response = await axios.post(`${base_url}sales`, array);
        if(response.status == 201){
            //After successful insertion, we have to remove the session
            alert("Successfully Purchased");
            this.setState({
                resultData: [],
                loading: false,
                totalPrice: ""
            })
            localStorage.removeItem("shoppingCart"); //removing the shopping cart session
        }
    }

    render() {
        var resultTable;

        if(this.state.loading){
            resultTable = <h1>Loading...</h1>
        }
        else {
            resultTable = this.state.resultData.map((item : any) => {
                return(
                    <div className="row">
                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            {/* <!-- Image --> */}
                            <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                <img src={"data:image/png;base64,"+item.image}
                                    className="w-100 h-100" alt="Blue Jeans Jacket" />
                                <a href="#!">
                                    <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.2)"}}></div>
                                </a>
                            </div>
                            {/* <!-- Image --> */}
                        </div>

                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            {/* <!-- Data --> */}
                            <p><strong>{item.product_name}</strong></p>
                            <p>Category: {item.product_category_name}</p>                            
                            <Link to={`/product/productDetails/${item.product_id}`}>
                                <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                                    title="Informatione">
                            <HiInformationCircle />
                            </button>
                            </Link>
                            <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                            title="Remove Item" onClick={() => this.removeProductFromCart(item.product_id)}>
                            <CgTrash />
                            </button>                          
                            {/* <!-- Data --> */}
                        </div>

                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            {/* <!-- Quantity --> */}
                            <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>                                

                                <div className="form-outline">                                    
                                    <label className="form-label" htmlFor="form1">Quantity: </label>
                                    <strong>{item.unit}</strong>
                                </div>                                
                            </div>
                            {/* <!-- Quantity --> */}

                            {/* <!-- Price --> */}
                            <p className="text-start text-md-center">
                            <strong>Price: ${item.product_price}</strong>
                            </p>
                            {/* <!-- Price --> */}
                        </div>
                        <hr className="my-4" />
                    </div>
                    // <div>
                    //     <div className="form-control" style={{color: "rebeccapurple", backgroundColor: "ThreeDLightShadow"}}>
                    //         <label htmlFor="">Product Name</label>
                    //         <div><strong>{item.product_name}</strong></div> <hr/>
                    //         <label htmlFor="">Category</label>
                    //         <div><strong>{item.product_category_name}</strong></div> <hr/>
                    //         <label htmlFor="">Price</label>
                    //         <div><strong>{item.product_price}</strong></div> <hr/>
                    //         <label htmlFor="">Unit</label>
                    //         <div><strong>{item.unit}</strong></div> <hr/>
                    //         <button className="btn btn-outline-warning btn-dark" onClick={() => this.removeProductFromCart(item.product_id)}>
                    //             Remove from Cart
                    //         </button>
                    //         <Link to={`/product/productDetails/${item.product_id}`}>
                    //             <button className="btn btn-outline-info btn-danger">Check Details</button>
                    //         </Link>
                    //     </div> <br/> <br/>
                    // </div>
                )
            })
        }
        var imagePath = "https://www.w3schools.com/html/img_girl.jpg";
        return (

            <div>
            <section className="h-100 gradient-custom">
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card mb-4">
                        <div className="card-header py-3">
                            <h5 className="mb-0">Cart Items</h5>
                        </div>
                        {/* <div>
                            {cart}
                        </div> */}
                        <div className="card-body">
                            <div>
                                {resultTable}
                            </div>                            

                            {/* <!-- Single item --> */}
                        </div>
                        </div>
                        <div className="card mb-4">
                        <div className="card-body">
                            <p><strong>Expected shipping delivery</strong></p>
                            <p className="mb-0">12.10.2020 - 14.10.2020</p>
                        </div>
                        </div>
                        <div className="card mb-4 mb-lg-0">
                        <div className="card-body">
                            <p><strong>We accept</strong></p>
                            <img className="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                            alt="Visa" />
                            <img className="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                            alt="American Express" />
                            <img className="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                            alt="Mastercard" />
                            <img className="me-2" width="45px"
                            src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_150x94.png"
                            alt="PayPal acceptance mark" />
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                            <h5 className="mb-0">Summary</h5>
                            </div>
                            <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                Products
                                <span>CAD ${this.state.totalPrice}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                Shipping
                                <span>Gratis</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                <div>
                                    <strong>Total amount</strong>
                                    <strong>
                                    <p className="mb-0">(including VAT)</p>
                                    </strong>
                                </div>
                                <span><strong>CAD ${this.state.totalPrice}</strong></span>
                                </li>
                            </ul>

                            <Link to={`/checkout`}>
                                <button type="button" className="btn btn-dark btn-lg btn-block">
                                    Checkout <MdShoppingCartCheckout />
                                </button>
                            </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </section>
        </div>

            // <div className="form-control container" style={{width: 700}}>
            //     <div className="row">
            //         <div className="col-md-12">
            //             {resultTable}
            //         </div>
            //         <hr/>
            //         <button disabled={true} hidden={this.state.totalPrice == "" ? true : false} className="btn btn-primary">
            //             <strong>Total Price: {this.state.totalPrice}</strong>
            //         </button>
            //         <button onClick={this.orderProduct} hidden={this.state.totalPrice == "" ? true : false} className="btn btn-dark">
            //             Confirm Order
            //         </button>
            //     </div>
            // </div>
        );
    }
}

export default SiteShoppingCart;