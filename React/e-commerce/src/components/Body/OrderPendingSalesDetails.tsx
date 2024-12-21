import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import {tab} from "@testing-library/user-event/dist/tab";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";


class OrderPendingSalesDetails extends Component<any, any>{
    state = {
        result: [],
        loading: false,
        customer_name: "",
        order_date: "",
        total_price: "",

        statusObject: {
            order: {
                status: ""
            }
        }
    }

    async componentDidMount() {
        var resp = await axios(`${base_url}sales/getSalesByOrder/`+window.location.pathname.split("/").pop());
        console.log(resp.data[0]);
        if(resp.status == 200) {
            this.setState({
                result: resp.data,
                loading: false,
                customer_name: resp.data[0].order.customer.mail.name,
                order_date: resp.data[0].order.date,
                total_price: resp.data[0].order.totalPrice,

                statusObject: {
                    order: {
                        status: resp.data[0].order.status
                    }
                }
            })
        }
    }

    changeDeliveryStatus = async () => {
        var response = await axios.get(`${base_url}order/changeDeliveryStauts/`+window.location.pathname.split("/").pop());
        if(response.status == 200){
            alert("Product Delivered");
            window.location.replace("/order/pending");
        }
    }

    changeToCancelStatus = async () => {
        var response = await axios.get(`${base_url}order/changeCancelStatus/`+window.location.pathname.split("/").pop());
        if(response.status == 200){
            alert("Order Cancelled");
            window.location.replace("/order/pending");
        }
    }

    render() {
        var resultTable;
        var table;
        var d1 : any = "";

        if(this.state.loading){
            resultTable = <h1>Loading...</h1>
        }
        else {
            resultTable = this.state.result.map((item : any) => {
                return(
                    <div>
                        <div className="form-control" style={{color: "rebeccapurple", backgroundColor: "ThreeDLightShadow"}}>
                            <label htmlFor="">Product Name</label>
                            <div><strong>{item.product.productName}</strong></div> <hr/>
                            <label htmlFor="">Price</label>
                            <div><strong>{item.price}</strong></div> <hr/>
                            <label htmlFor="">Unit</label>
                            <div><strong>{item.unit}</strong></div> <hr/>
                            <label htmlFor="">Vendor</label>
                            <div><strong>{item.product.vendor.shopName}</strong></div> <hr/>
                        </div> <br/> <br/>
                    </div>
                )
            })

            table = (
                <div>
                    <Card>
                        <Card.Header>
                            <strong>{this.state.order_date}</strong><br/>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Customer: {this.state.customer_name}</Card.Title>
                            {/*<Card.Title>Customer: {this.state.statusObject.order.status}</Card.Title>*/}
                            <Card.Text>
                                <strong>Total Purchase: Tk {this.state.total_price}</strong> <br/>
                            </Card.Text>
                                <div
                                    hidden={
                                        this.state.statusObject.order.status == "pending" ? false : true
                                    }
                                >
                                    <button style={{float: "right"}}
                                            onClick={this.changeDeliveryStatus}
                                            className="btn-dark rounded-end btn"
                                    >
                                        Set to Deliver
                                    </button>
                                    <button style={{float: "right"}}
                                            onClick={this.changeToCancelStatus}
                                            className="btn-danger rounded-end btn"
                                    >
                                        Cancel Delivery
                                    </button>
                                </div>
                                <button disabled={true} className="btn-warning">
                                    {this.state.statusObject.order.status == "pending" ? "Pending" :
                                        this.state.statusObject.order.status == "cancelled" ? "Cancelled" : "Delivered"}
                                </button>
                        </Card.Body>
                    </Card> <br/>
                </div>
            )
        }
        return(
            <div className="form-control container" style={{width: 700}}>
                {table}
                <div className="row">
                    <div className="col-md-12">
                        {resultTable}
                    </div>
                </div>
            </div>
        )
    }
}
export default OrderPendingSalesDetails;

/*
const OrderPendingSalesDetails = () => {
    var v1 = 10;
    var ara : any = [];
    var ara2: any = [];
    var table = (<div>hello</div>)
    let [responseData, setResponseData] = useState({
        //result: "",
        resultTable: ""
    })

    useEffect( () => {
        loadData()//.then().finally();
    },[])

    const loadData = async () => {
        var resultData = await axios(`${base_url}sales/getSalesByOrder/`+window.location.pathname.split("/").pop());
        console.log(resultData.data);
        if(resultData.status == 200){
            ara = resultData.data;
            console.log(ara);
            for(var i = 0; i < ara.length; i++){
                /!*table += (
                    <div>
                        <button>{ara[i].price}</button>
                    </div>
                )*!/
            }
            //console.log(responseData.result);
            ara2 = ara.map((item : any) => {
                return(
                    <div>
                        <button>{item.id}</button>
                    </div>
                )
            })
            //return ara2;
        }
    }

    return(
        <div>
            hello, {v1}
            <div>
                {/!*{ara.map((item: any) => {
                    return(
                        <div>hello</div>
                    )
                })}*!/}
                {ara2}
            </div>
        </div>
    )
}

export default OrderPendingSalesDetails;*/
