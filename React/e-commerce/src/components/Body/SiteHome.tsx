import React, {Component} from 'react';
import  "./sitehome.css";
import axios from "axios";
import base_url from "../../api/bootapi";
import {Card, Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import {HiInformationCircle} from "react-icons/hi";



/*export default function SiteHome(){

return (
        <div className='container'>
            <section id="header" className="jumbotron text-left text-white">
                <div className="container p-5 ">
                    <h1 className="display-4 ">GET UPTO 60% OFF!</h1>
                    <p className="lead">Summer sale is now available with free shipping of all your products.</p>
                    <hr className="my-4"/>
                    <p>Patronize us today because limited products available</p>
                    <a className="btn btn-primary btn-lg " href="#" role="button ">Learn more</a>
                </div>
            </section>
        </div>    
    )
}*/

class SiteHome extends Component<any, any>{
    constructor(props:any) {
        super(props);
    }

    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get(`${base_url}products`);
        console.log(resp);
        if (resp.status === 200) {
            this.setState({
                result: resp.data,
                loading: false,
            })
        }
    }

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
                                {/*<Button variant="primary" href=''>Edit</Button>*/}
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
                    <section id="header" className="jumbotron text-left text-white">
                        
                    </section> <br/>
                    <div className="row justify-content-lg-start">
                        {resultTable}
                    </div>
                </div>
            </div>
        );
    }
}

export default SiteHome

