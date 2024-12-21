import React, {Component} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import {Col, Container, Input, Label, Row} from "reactstrap";
import {Toast, ToastContainer} from "react-bootstrap";

class UpdateVendorRegShop extends Component<any, any>{
    state = {
        id: "",
        registrationNumber: "",
        shopPhone: "",
        shopAddress: "",
        shopName: "",
        mail: {
            mail: ""
        },

        registrationNumberErr: "",
        shopPhoneErr: "",
        shopAddressErr: "",
        shopNameErr: "",

        successMessage: false,
    }

    postData = () => {
        axios.post(`${base_url}vendor/update`,this.state,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then(
            (response)=>{
                console.log(response);
                if(response.status == 201){
                    this.setState({
                        shopNameErr: "",
                        shopAddressErr: "",
                        shopPhoneErr: "",
                        registrationNumberErr: "",
                        successMessage: true
                    })
                }
            },(error)=> {
                //console.log(error.error);
                if (error.response.status == 400) {
                    //alert("error");
                    this.setState({
                        shopNameErr: error.response.data.shopName,
                        shopAddressErr: error.response.data.shopAddress,
                        shopPhoneErr: error.response.data.shopPhone,
                        registrationNumberErr: error.response.data.registrationNumber
                    })
                }
            }
        );
    }

    closeMessage = () => {
        this.setState({
            successMessage: false
        })
    }

    async componentDidMount() {
        var resp = await axios.get(`${base_url}vendor/get/`+localStorage.getItem("userId_session"));
        console.log(resp);
        if(resp.status == 200){
            this.setState({
                shopName: resp.data.shopName,
                shopAddress: resp.data.shopAddress,
                registrationNumber: resp.data.registrationNumber,
                id: resp.data.id,
                shopPhone: resp.data.shopPhone,
                mail: {
                    mail: resp.data.mail.mail
                }
            })
        }
    }
    render() {
        return(
            <div >
                <Container >
                    <Row className='justify-content-center my-5'>
                        <Col md={4}>
                            <form /*onSubmit={this.handleFormSubmit}*/>
                                <Input
                                    id="id"
                                    name="id"
                                    type="text"
                                    value={this.state.id}
                                    className='form-control'
                                    hidden={true}
                                />

                                <Label className='form-label my-2' for="shopName">
                                    Shop Name
                                </Label>
                                <Input
                                    id="shopName"
                                    name="shopName"
                                    type="text"
                                    value={this.state.shopName}
                                    className='form-control'
                                    onChange={(e)=>{
                                        this.setState({
                                            shopName: e.target.value
                                        })
                                    }}
                                />
                                <div className="text-danger">
                                    {this.state.shopNameErr}
                                </div>

                                <Label className='form-label my-2' for="shopPhone">
                                    Shop Phone
                                </Label>
                                <Input
                                    id="shopPhone"
                                    name="shopPhone"
                                    placeholder="Shop Phone Number"
                                    type="text"
                                    value={this.state.shopPhone}
                                    className='form-control'
                                    onChange={(e)=>{
                                        this.setState({
                                            shopPhone: e.target.value
                                        })
                                    }}
                                />
                                <div className="text-danger">
                                    {this.state.shopPhoneErr}
                                </div>

                                <Label className='form-label my-2' for="registrationNumber">
                                    Shop Registration Number
                                </Label>
                                <Input
                                    id="registrationNumber"
                                    name="registrationNumber"
                                    placeholder="Shop Registration Number"
                                    type="text"
                                    value={this.state.registrationNumber}
                                    className='form-control'
                                    onChange={(e)=>{
                                        this.setState({
                                            registrationNumber: e.target.value
                                        })
                                    }}
                                />
                                <div className="text-danger">
                                    {this.state.registrationNumberErr}
                                </div>

                                <Label className='form-label my-2' for="shopAddress">
                                    Shop Address
                                </Label>
                                <textarea className="form-control styleTextarea"  id="shopAddress"
                                          value={this.state.shopAddress}
                                          onChange={(e)=>{
                                              this.setState({
                                                  shopAddress: e.target.value
                                              })
                                          }}
                                >

                                </textarea>
                                <div className="text-danger">
                                    {this.state.shopAddressErr}
                                </div>
                            </form>
                            <button className='my-2 w-100 btn-primary btn' onClick={this.postData}>Update</button>
                        </Col>
                    </Row>

                    <ToastContainer position="bottom-end" className="p-3">
                        <Toast show={this.state.successMessage} onClose={this.closeMessage} >
                            <Toast.Header>
                                <strong className="me-auto">Success</strong>

                            </Toast.Header>
                            <Toast.Body>Successfully Shop Updated</Toast.Body>
                        </Toast>
                    </ToastContainer>

                </Container>

            </div>
        )
    }
}

export default UpdateVendorRegShop;