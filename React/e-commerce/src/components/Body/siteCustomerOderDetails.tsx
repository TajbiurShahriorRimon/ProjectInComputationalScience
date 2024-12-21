import React, {Component} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import {Card} from "react-bootstrap";

class SiteCustomerOderDetails extends Component<any, any>{
    state = {
        result: [],
        loading: false,
        customer_name: "",
        order_date: "",
        total_price: ""
    }

    async componentDidMount() {
        var resp = await axios(`${base_url}sales/getBySalesOrder/`+window.location.pathname.split("/").pop());
        console.log(resp.data[0]);
        if(resp.status == 200) {
            this.setState({
                result: resp.data,
                loading: false,
                customer_name: resp.data[0].order.customer.mail.name,
                order_date: resp.data[0].order.date,
                total_price: resp.data[0].order.totalPrice,
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
                            <Card.Text>
                                <strong>Total Purchase: Tk {this.state.total_price}</strong> <br/>
                            </Card.Text>
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
export default SiteCustomerOderDetails;