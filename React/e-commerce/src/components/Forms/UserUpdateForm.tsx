import React, {Component} from "react";
import {Button, Col, Container, Form, Input, Label, Row} from "reactstrap";
import axios from "axios";
import base_url from "../../api/bootapi";
import {Toast, ToastContainer} from "react-bootstrap";

class UserUpdateForm extends Component<any, any>{
    state = {
        name: "",
        address: "",
        gender: "",
        mail: "",
        phone: "",
        status: "",
        type: "",

        nameErr: "",
        addressErr: "",
        phoneErr: "",

        successMessage: false,
    }

    postData = () => {
        axios.post(`${base_url}user/update`,this.state,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}).then(
            (response)=>{
                console.log(response);
                if(response.status == 201){
                    this.setState({
                        nameErr: "",
                        addressErr: "",
                        phoneErr: "",
                        successMessage: true
                    })
                }
            },(error)=> {
                if (error.response.status == 400) {
                    this.setState({
                        nameErr: error.response.data.name,
                        addressErr: error.response.data.address,
                        phoneErr: error.response.data.phone
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
        var resp = await axios.get(`${base_url}user/`+localStorage.getItem("email"));
        console.log(resp);
        if(resp.status == 200){
            this.setState({
                name: resp.data.name,
                address: resp.data.address,
                gender: resp.data.gender,
                mail: resp.data.mail,
                phone: resp.data.phone,
                type: resp.data.type,
                status: resp.data.status,
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
                                    id="mail"
                                    name="mail"
                                    type="text"
                                    value={this.state.mail}
                                    className='form-control'
                                    hidden={true}
                                />

                                <Label className='form-label my-2' for="Name">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    className='form-control'
                                    onChange={(e)=>{
                                        this.setState({
                                            name: e.target.value
                                        })
                                    }}
                                />
                                <div className="text-danger">
                                    {this.state.nameErr}
                                </div>

                                <Label className='form-label my-2' for="userPhone">
                                    Phone
                                </Label>
                                <Input
                                    id="userPhone"
                                    name="userPhone"
                                    placeholder="Phone Number"
                                    type="text"
                                    value={this.state.phone}
                                    className='form-control'
                                    onChange={(e)=>{
                                        this.setState({
                                            phone: e.target.value
                                        })
                                    }}
                                />
                                <div className="text-danger">
                                    {this.state.phoneErr}
                                </div>

                                <Label className='form-label my-2' for="userPhone">
                                    Address
                                </Label>
                                <textarea className="form-control styleTextarea"  id="userAddress"
                                      value={this.state.address}
                                      onChange={(e)=>{
                                          this.setState({
                                              address: e.target.value
                                          })
                                      }}
                                >

                                </textarea>
                                <div className="text-danger">
                                    {this.state.addressErr}
                                </div>

                                <Label className='form-label my-2'>
                                    Gender
                                </Label>
                                <select value={this.state.gender}
                                    className="form-select" aria-label="Default select example"
                                    id="gender" onChange={(e)=>{
                                    this.setState({
                                        gender: e.target.value
                                    })
                                }}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {/*<Button onClick={this.postData} className='my-2 w-100' type='submit' color='primary'>Submit</Button>*/}
                            </form>
                            <button className='my-2 w-100 btn-primary btn' onClick={this.postData}>Update</button>
                        </Col>
                    </Row>

                    <ToastContainer position="bottom-end" className="p-3">
                        <Toast show={this.state.successMessage} onClose={this.closeMessage} >
                            <Toast.Header>
                                <strong className="me-auto">Success</strong>

                            </Toast.Header>
                            <Toast.Body>Successfully Profile Updated</Toast.Body>
                        </Toast>
                    </ToastContainer>

                </Container>

            </div>
        )
    }
}

export default UserUpdateForm;