import React, {Component} from "react";
import axios from "axios";
import base_url from "../../api/bootapi";
import {Button, Col, Container, Input, Label, Row} from "reactstrap";
import {Toast, ToastContainer} from "react-bootstrap";

class UserPasswordChange extends Component<any, any>{
    state = {
        mail: "",
        password: "",
        confirmPassword: "",

        mailErr: "",
        passwordErr: "",
        confirmPasswordErr: "",

        successMessage: false,
    }

    handleFormSubmit = (e: any) => {
        this.checkValidation(e);
    }

    checkValidation = async (e: any) => {
        e.preventDefault();
        var isValid = true
        if(this.state.mail == ""){
            isValid = false;
            this.setState({
                mailErr: "Email is required",
            })
        }
        else {
            this.setState({
                mailErr: "",
            })
        }
        if(this.state.password == ""){
            isValid = false;
            this.setState({
                passwordErr: "Password is required",
            })
        }
        else if(this.state.password.length < 5){
            isValid = false;
            this.setState({
                passwordErr: "At Least 5",
            })
        }
        else {
            this.setState({
                passwordErr: ""
            })
        }
        if(this.state.confirmPassword == ""){
            isValid = false;
            this.setState({
                confirmPasswordErr: "Confirm Password is required",
            })
        }
        else{
            this.setState({
                confirmPasswordErr: "",
            })
        }

        if(this.state.mail != "" && this.state.mail != localStorage.getItem("email")){
            isValid = false;
            this.setState({
                mailErr: "Wrong User Email!",
            })
        }
        if(this.state.confirmPassword != "" && this.state.password != ""){
            if (this.state.confirmPassword != this.state.password){
                isValid = false;
                this.setState({
                    confirmPasswordErr: "Password did not match the Confirm Password",
                })
            }
        }
        if (isValid == true){
            var resp = await axios.post(`${base_url}changePassword/`+localStorage.getItem("email"), this.state);
            if(resp.status == 200){
                this.setState({
                    successMessage: true
                })
            }
        }
    }

    closeMessage = () => {
        this.setState({
            successMessage: false
        })
    }

    async componentDidMount() {

    }
    render() {
        return(
            <div >
                <Container >
                    <Row className='justify-content-center my-5'>
                        <Col md={4}>
                            <form>
                                <Label className="form-label my-2" for="mail">
                                    Email
                                </Label>
                                <Input
                                    id="mail"
                                    name="mail"
                                    placeholder="Enter Your Mail Id"
                                    type="text"
                                    className='form-control'
                                    onChange={(e)=>{
                                        this.setState({
                                            mail: e.target.value
                                        })
                                    }}
                                />
                                <div className="text-danger">
                                    {this.state.mailErr}
                                </div>

                                <Label className='form-label my-2' for="Name">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    placeholder="Password... At least 5 characters"
                                    name="password"
                                    type="password"
                                    className='form-control'
                                    onChange={(e)=>{
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }}
                                />
                                <div className="text-danger">
                                    {this.state.passwordErr}
                                </div>

                                <Label className='form-label my-2' for="userPhone">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={this.state.confirmPassword}
                                    className='form-control'
                                    onChange={(e)=>{
                                        this.setState({
                                            confirmPassword: e.target.value
                                        })
                                    }}
                                />
                                <div className="text-danger">
                                    {this.state.confirmPasswordErr}
                                </div>
                            </form>
                            <button className="btn-outline-success btn btn-dark my-2 w-100"
                                onClick={this.checkValidation}>
                                Update Password
                            </button>
                        </Col>
                    </Row>

                    <ToastContainer position="bottom-end" className="p-3">
                    <Toast show={this.state.successMessage} onClose={this.closeMessage} >
                        <Toast.Header>
                            {/*<img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />*/}
                            <strong className="me-auto">Success</strong>
                            {/*<small>11 mins ago</small>*/}
                        </Toast.Header>
                        <Toast.Body>Successfully Changed Password</Toast.Body>
                    </Toast>
                    </ToastContainer>

                </Container>

            </div>
        )
    }
}

export default UserPasswordChange;