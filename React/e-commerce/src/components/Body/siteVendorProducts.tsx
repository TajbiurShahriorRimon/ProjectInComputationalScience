import React, {Component} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";
import {TiTick} from "react-icons/ti";
import {ImCross} from "react-icons/im";

class SiteVendorProducts extends Component<any, any>{
    constructor(props:any) {
        super(props);
    }

    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get(`${base_url}product/vendor/`+localStorage.getItem("userId_session"));
        //console.log(resp);
        if (resp.status === 200) {
            this.setState({
                result: resp.data,
                loading: false,
            })
        }
    }

    changeProductStatus = async (productId: any) => {
        const resp = await axios.get(`${base_url}product/changeStatus/`+productId);
        console.log(resp);
        if (resp.status === 200) {
            const respData = await axios.get(`${base_url}product/vendor/`+localStorage.getItem("userId_session"));
            //console.log(respData);
            if (respData.status === 200) {
                this.setState({
                    result: respData.data,
                    loading: false,
                })
            }
        }
    }

    render() {
        var userLocalStorage = localStorage.getItem("userType_session");
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
                                <span>
                                {/*<div hidden={userLocalStorage != "vendor" ? true : false}>
                                    <button onClick={() => this.changeProductStatus(item.productId)} className="btn btn-dark">
                                        {item.status == "active" ?
                                            (<div><h5><TiTick/></h5>Change</div>) :
                                            (<div><h5><ImCross/></h5>Change</div>)
                                        }
                                    </button>
                                </div>*/}
                                    <button onClick={() => this.changeProductStatus(item.productId)} className="btn btn-dark"
                                        hidden={userLocalStorage != "vendor" ? true : false}
                                    >
                                        {item.status == "active" ?
                                            (<div><h5><TiTick/></h5>Set Inactive</div>) :
                                            (<div><h5><ImCross/></h5>Set Active</div>)
                                        }
                                    </button> &nbsp;
                                    <Link to={'/vEditProducts/'+localStorage.getItem("email")+'/'+item.productId}>
                                        <Button className="btn-info" variant="outline-danger">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Link to={`/product/productDetails/`+item.productId}>
                                        <HiInformationCircle style={{fontSize:"2em", float: "right"}}/>
                                    </Link>
                                </span>
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
                    <div className="row justify-content-lg-start">
                        {resultTable}
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteVendorProducts