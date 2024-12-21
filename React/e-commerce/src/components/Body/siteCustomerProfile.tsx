import React, {Component} from "react";
import {CgProfile, CgNotes, CgBriefcase} from "react-icons/cg";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import {Nav, Navbar} from "react-bootstrap";
import axios from "axios";
import base_url from "../../api/bootapi";

class SiteCustomerProfile extends Component<any, any>{
    constructor(props:any) {
        super(props);
    }

    state = {
        mail: "",
        address: "",
        name: "",
        phone: "",
        gender: "",
        loading: true,
    }

    async componentDidMount() {
        const resp = await axios.get(`${base_url}user/${localStorage.getItem("email")}`);
        console.log(resp);
        if (resp.status === 200){
            this.setState({
                name: resp.data.name,
                mail: resp.data.mail,
                address: resp.data.address,
                phone: resp.data.phone,
                gender: resp.data.gender,
                loading: false,
            })
            console.log(this.state.mail);
        }
    }

    render() {
        return(
            <div className="container">
                <div className="form-control">
                    <div className="row">
                        <div className="col-md-3" style={{backgroundColor:"mistyrose"}}>
                            {/*<div className="form-group">
                                <h3><u>My Account <CgProfile style={{color:"blue"}}/></u></h3>
                                <div><Link to=""><strong style={{color: "red"}}>My Profile</strong></Link></div>
                                <div><Link to=""><strong style={{color: "black"}}>Edit Profile</strong></Link></div>
                                <hr/>
                                <h3><u>My Report <CgNotes style={{color:"blue"}}/></u></h3>
                                <div><Link to=""><strong style={{color: "black"}}>Order Report</strong></Link></div>
                            </div>*/}
                            <Navbar variant="dark" className="flex-column">
                                <h3><u>My Account <CgProfile style={{color:"blue"}}/></u></h3>
                                <Nav.Link href=""><strong style={{color: "red"}}>My Profile</strong></Nav.Link>
                                <Link to={'/user/profileEdit'} style={{color: "black"}} className="nav-link">
                                    <strong>Edit Profile</strong>
                                </Link>
                                <Link to={'/vendor/updateShop'} style={{color: "green"}} className="nav-link"
                                      hidden={localStorage.getItem("userType_session") == "vendor" ? false : true}
                                >
                                    <strong>Edit My Shop</strong>
                                </Link>

                                {/*<h3><u>My Report <CgNotes style={{color:"blue"}}/></u></h3>
                                <Nav.Link href="/home"><strong style={{color: "black"}}>Order Report</strong></Nav.Link>*/}
                                {/*<div hidden={localStorage.getItem("userType_session") == "vendor" ? false : true}>
                                    <h3><u>My Products <CgBriefcase style={{color:"green"}}/></u></h3>
                                    <Link to={'/user/profileEdit'} style={{color: "black"}} className="nav-link">
                                        <strong>My Active Products</strong>
                                    </Link>
                                </div>*/}
                            </Navbar>
                        </div>
                        <div className="col-md-4">
                            <div className="form-control">
                                <label htmlFor="">Name</label>
                                <div><strong>{this.state.name}</strong></div>
                            </div> <br/>
                            <div className="form-control">
                                <label htmlFor="">Email</label>
                                <div><strong>{this.state.mail}</strong></div>
                            </div> <br/>
                            <div className="form-control">
                                <label htmlFor="">Address</label>
                                <div><strong>{this.state.address}</strong></div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-control">
                                <label htmlFor="">Phone</label>
                                <div><strong>{this.state.phone}</strong></div>
                            </div> <br/>
                            <div className="form-control">
                                <label htmlFor="">Gender</label>
                                <div><strong>{this.state.gender == "male" ? "Male" : "Female"}</strong></div>
                            </div> <br/>
                            <Link to={'/user/changePassword'}>
                                <Button style={{width: 200, height: 60, float: "right"}} className="btn-info rounded-3">Change Password</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SiteCustomerProfile;