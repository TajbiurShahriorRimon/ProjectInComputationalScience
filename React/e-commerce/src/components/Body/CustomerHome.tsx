import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Card, CardGroup, Container, Button, Carousel} from "react-bootstrap";
import {HiInformationCircle} from "react-icons/hi";
import axios from "axios";
import {ImHeart} from "react-icons/im";


class CustomerHome extends Component<any, any>{
    constructor(props:any) {
        super(props);
    }

    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        //If the user search a product then the following line executes
        /*if(localStorage.getItem("searchProductSession") != null){
            const resp = await axios.get('http://localhost:9090/products');
            //now remove the session
            localStorage.removeItem("searchProductSession");
            console.log(resp);
            if (resp.status === 200) {
                this.setState({
                    result: resp.data,
                    loading: false,
                })
            }
            //alert("hello");
        }*/
        //else {
            const resp = await axios.get('http://localhost:9090/products');
            console.log(resp);
            if (resp.status === 200) {
                this.setState({
                    result: resp.data,
                    loading: false,
                })
            }
            //alert("hello123");
        //}
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
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                /*src="holder.js/800x400?text=First slide&bg=373940"*/
                                src={require('./images/Professional-E-Commerce-Shoes-Banner-Design.jpg')}
                                style={{height: "365px", width: "100%"}}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>Choose you new Sports Shoe for Eid!!!</h3>
                                <p>Fitness!! Sports!! Jogging and many MORE</p>
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
                                <h3>Winter Sale</h3>
                                <p>Winter is here. So do the winter cloths!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={require('./images/headphone.png')}
                                style={{height: "365px", width: "100%"}}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Gaming Headphone!!!</h3>
                                <p>Get 35% OFF and get you new gaming headphone!!!</p>
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
        );
    }
}

export default CustomerHome;