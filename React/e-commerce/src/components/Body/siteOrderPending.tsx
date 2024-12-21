import React, {Component} from "react";
import axios from "axios";
import {Card, Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";
import base_url from "../../api/bootapi";
import StarRatings from "react-star-ratings";

class SiteOrderPending extends Component<any, any>{
    constructor(props:any) {
        super(props);
    }

    state = {
        result: [],
        allOrdersResult: [],
        loading: true,
    }

    async componentDidMount() {
        //getting the pendign orders
        const resp = await axios.get(`${base_url}order/getPedingOrders`);
        console.log(resp);
        if (resp.status === 200) {
            this.setState({
                result: resp.data,
                loading: false,
            })
        }

        //now getting all the Orders (delivered, cancelled and, pending)
        const respAllOrders = await axios.get(`${base_url}order/get`);
        console.log(respAllOrders);
        if (respAllOrders.status === 200) {
            this.setState({
                allOrdersResult: respAllOrders.data,
                loading: false,
            })
        }
    }

    render() {
        var resultTable; //pending orders
        var allOrdersTable;
        var deliveredOrdersTable;
        var cancelledOrdersTable;

        if(this.state.loading){
            resultTable = <h1>Loading...</h1>
        }
        else {
            resultTable = this.state.result.map((item : any) => {
                return(
                    <div key={item.id}>
                        <Card>
                            <Card.Header>
                                <strong>{item.date}</strong><br/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Customer: {item.customer.mail.name}</Card.Title>
                                <Card.Text>
                                    <strong>Total Purchase: Tk {item.totalPrice}</strong> <br/>
                                    <strong>Phone: {item.customer.mail.phone}</strong> <br/>
                                    <strong>Email: {item.customer.mail.mail}</strong> <br/>
                                </Card.Text>
                                <Link to={"/order/pendingSalesDetails/"+item.id}>
                                    <button style={{float: "right"}}
                                            className="btn-danger rounded-end btn"
                                        /*hidden={this.state.test == "12434" ? true : false}*/
                                    >
                                        Check Product List
                                    </button>
                                </Link>
                            </Card.Body>
                        </Card> <br/>
                    </div>
                )
            })

            allOrdersTable = this.state.allOrdersResult.map((item : any) => {
                return(
                    <div key={item.id}>
                        <Card>
                            <Card.Header>
                                <strong>{item.date}</strong><br/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Customer: {item.customer.mail.name}</Card.Title>
                                <Card.Text>
                                    <strong>Total Purchase: Tk {item.totalPrice}</strong> <br/>
                                    <strong>Phone: {item.customer.mail.phone}</strong> <br/>
                                    <strong>Email: {item.customer.mail.mail}</strong> <br/>
                                </Card.Text>
                                <button disabled={true} className="btn-secondary">
                                    {item.status == "delivered" ? "Delivered" :
                                        item.status == "cancelled" ? "Cancelled" : "Pending"
                                    }
                                </button>
                                <Link to={"/order/pendingSalesDetails/"+item.id}>
                                    <button style={{float: "right"}}
                                            className="btn-danger rounded-end btn"
                                        /*hidden={this.state.test == "12434" ? true : false}*/
                                    >
                                        Check Product List
                                    </button>
                                </Link>
                            </Card.Body>
                        </Card> <br/>
                    </div>
                )
            })

            deliveredOrdersTable = this.state.allOrdersResult.map((item : any) => {
                if (item.status == "delivered"){
                    return(
                        <div key={item.id}>
                            <Card>
                                <Card.Header>
                                    <strong>{item.date}</strong><br/>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Customer: {item.customer.mail.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Total Purchase: Tk {item.totalPrice}</strong> <br/>
                                        <strong>Phone: {item.customer.mail.phone}</strong> <br/>
                                        <strong>Email: {item.customer.mail.mail}</strong> <br/>
                                    </Card.Text>
                                    <Link to={"/order/pendingSalesDetails/"+item.id}>
                                        <button style={{float: "right"}}
                                                className="btn-danger rounded-end btn"
                                            /*hidden={this.state.test == "12434" ? true : false}*/
                                        >
                                            Check Product List
                                        </button>
                                    </Link>
                                </Card.Body>
                            </Card> <br/>
                        </div>
                    )
                }
            })

            cancelledOrdersTable = this.state.allOrdersResult.map((item : any) => {
                if (item.status == "cancelled"){
                    return(
                        <div key={item.id}>
                            <Card>
                                <Card.Header>
                                    <strong>{item.date}</strong><br/>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Customer: {item.customer.mail.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Total Purchase: Tk {item.totalPrice}</strong> <br/>
                                        <strong>Phone: {item.customer.mail.phone}</strong> <br/>
                                        <strong>Email: {item.customer.mail.mail}</strong> <br/>
                                    </Card.Text>
                                    <Link to={"/order/pendingSalesDetails/"+item.id}>
                                        <button style={{float: "right"}}
                                                className="btn-danger rounded-end btn"
                                            /*hidden={this.state.test == "12434" ? true : false}*/
                                        >
                                            Check Product List
                                        </button>
                                    </Link>
                                </Card.Body>
                            </Card> <br/>
                        </div>
                    )
                }
            })
        }
        return(
            <div>
                <div className='container'>
                    <Tabs defaultActiveKey="pendingOrders" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="pendingOrders" title="Pending">
                            <div className="row">
                                <div className="col-sm-7">
                                    {resultTable}
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="allOrders" title="All Orders">
                            <div className="row">
                                <div className="col-sm-7">
                                    {allOrdersTable}
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="deliveredOrders" title="Delivered Orders">
                            <div className="row">
                                <div className="col-sm-7">
                                    {deliveredOrdersTable}
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="cancelledOrders" title="Cancelled Orders">
                            <div className="row">
                                <div className="col-sm-7">
                                    {cancelledOrdersTable}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default SiteOrderPending;