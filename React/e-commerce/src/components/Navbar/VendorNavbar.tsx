import React, {useEffect, useState} from 'react';
import {Col, Input, NavbarToggler, Row} from "reactstrap";
import  "./navbar.css";
import icon from "./images/search2.svg";
import {Card, Container, Form, FormControl, Navbar, Nav, Button, NavDropdown} from 'react-bootstrap';
import {ImSearch} from "react-icons/im";
import {Link, useNavigate} from "react-router-dom";
import {CgAdd, CgBriefcase, CgList, CgProfile, CgViewGrid} from "react-icons/cg";
import {HiOutlineLogout} from "react-icons/hi";

function VendorNavbar(){
    var navigate = useNavigate();

    const [vendorNav,setVendorNav]=useState({
        vendorNavbar: (<div></div>)
    })

    useEffect(() => {
        if (localStorage.getItem("userType_session") == "vendor") {
            setVendorNav({
                vendorNavbar: (
                    <div>
                        <Navbar bg="white" color="white" expand="lg" fixed="top" className="navbar text-opacity-100"
                            style={{ border: "1px solid green" }}>
                            <Container>
                                <Navbar.Brand href="/home">
                                    <img src={require('../Navbar/images/Silton.png')} 
                                        style={{
                                            maxWidth: "50%",
                                            maxHeight: "50%",
                                            
                                            width: "auto",
                                            height: "auto",
                                            objectFit: "contain",
                                            }}
                                    />
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="justify-content-center" style={{ flex: 1}}>
                                        <Form className="d-flex align-content-center">
                                            <FormControl
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                                onChange={setSearchValue}
                                            />
                                            <Button onClick={searchProducts} variant="outline-success"><ImSearch/></Button>
                                        </Form>
                                    </Nav>
                                    <Nav.Link href="/vHome">Home</Nav.Link>
                                    <NavDropdown title="Products" id="basic-nav-dropdown">
                                        <NavDropdown.Item href={'/vAddProducts/'+localStorage.getItem("email")}>Add Product <CgAdd style={{color:"blue"}}/></NavDropdown.Item>
                                        <NavDropdown.Item href="/vendor/products">My Products <CgList style={{color:"purple"}}/></NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown title="Vendor" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/customer/profile">My Account <CgProfile style={{color:"blue"}}/></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/logout">Log Out <HiOutlineLogout style={{color:"red"}}/></NavDropdown.Item>
                                    </NavDropdown>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        <br/> <br/> <br/> <br/> <br/> <br/>
                    </div>
                )
            })
        }
    }, [])

    const setSearchValue = (e: any) => {
        //alert(e.target.value);
        localStorage.setItem("searchProductSession", e.target.value);
        //alert(localStorage.getItem("searchProductSession"));
    }

    const searchProducts = () => {
        //alert('fdf');
        if (localStorage.getItem("searchProductSession") != null){
            if(localStorage.getItem("searchProductSession") == ""){
                //alert('prob');
                return
            }
            var key = localStorage.getItem("searchProductSession");
            localStorage.removeItem("searchProductSession");
            //navigate("/product/search/"+key);
            window.location.href = "/product/search/"+key;
            //alert('last');
        }
    }

    return(
        <div>
            {vendorNav.vendorNavbar}
        {/*<Navbar bg="dark" expand="lg" variant="dark" fixed="top" className="navbar text-opacity-100">
            <Container>
                <Navbar.Brand href="/vHome">Vendor</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-center" style={{ flex: 1}}>
                        <Form className="d-flex align-content-center">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <Button variant="outline-success"><ImSearch/></Button>
                        </Form>
                    </Nav>
                    <Nav.Link href="/vProfile">Profile</Nav.Link>
                    <Nav.Link href="/vShopInfo">Shop Info</Nav.Link>
                    <Nav.Link href="/vAddProducts">Products</Nav.Link>
                    <Nav.Link href="#">Sales Report</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <br/> <br/> <br/>*/}
        </div>
    )
}

export default VendorNavbar;