import React, {useEffect, useState} from 'react';
import {Col, Input, NavbarToggler, Row} from "reactstrap";
import  "./navbar.css";
import icon from "./images/search2.svg";
import {Card, Container, Form, FormControl, Navbar, Nav, Button, NavDropdown} from 'react-bootstrap';
import {ImHeart, ImSearch} from "react-icons/im";
import { CgProfile, CgBox, CgShoppingCart, CgHome, CgShoppingBag } from 'react-icons/cg';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdReviews } from 'react-icons/md';
import { Link } from 'react-router-dom';

function HomeNavbar(){

    const [homeNav,setHomeNav]=useState({
        homeNav: (<div></div>)
    })

    useEffect(() => {
        if (localStorage.getItem("userType_session") == null /*||
            localStorage.getItem("userType_session") != "admin" ||
            localStorage.getItem("userType_session") != "vendor" ||
            localStorage.getItem("userType_session") != "customer"*/
        ){
            setHomeNav({
                homeNav: (
                    <div>
                        <Navbar bg="dark" expand="lg" variant="dark" fixed="top" className="navbar text-opacity-100">
                            <Container>
                                <Navbar.Brand href="/home">Dokan</Navbar.Brand>
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
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <NavDropdown title="Registration" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/customerReg">Customer Registration <CgProfile style={{color:"blue"}}/></NavDropdown.Item>
                                        <NavDropdown.Item href="/vendorReg">Vendor Registration <CgHome style={{color:"red"}}/> </NavDropdown.Item>
                                    </NavDropdown>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        <br/> <br/> <br/>
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
            {homeNav.homeNav}
        </div>
    )
}

export default HomeNavbar;