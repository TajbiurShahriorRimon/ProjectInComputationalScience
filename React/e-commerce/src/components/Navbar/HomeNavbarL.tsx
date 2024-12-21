import React from 'react';
import {Col, Input, NavbarToggler, Row} from "reactstrap";
import  "./navbar.css";
import icon from "./images/search2.svg";
import {Card, Container, Form, FormControl, Navbar, Nav, Button, NavDropdown} from 'react-bootstrap';
import {ImSearch} from "react-icons/im";
import { CgProfile, CgHome } from 'react-icons/cg';

function HomeNavbar(){
    return(
        <div>
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top" className="navbar text-opacity-100">
            <Container>
                <Navbar.Brand href="/home">Dokan</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-center" style={{ flex: 1}}>
                        
                    </Nav>
                    <button>
                    <Navbar.Text>
                    <Nav.Link href="/">Home </Nav.Link>
                    </Navbar.Text>
                    </button>
                    <button>
                    <Navbar.Text>
                    <Nav.Link href="/login">Login</Nav.Link>
                    </Navbar.Text>
                    </button>
                    {/* <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link> */}

                    <Nav defaultActiveKey="/home" as="ul">
                        <NavDropdown title="Registration" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/customerReg">Customer Registration <CgProfile style={{color:"blue"}}/></NavDropdown.Item>
                            <NavDropdown.Item href="/vendorReg">Vendor Registration <CgHome style={{color:"red"}}/> </NavDropdown.Item>                        
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <br/> <br/> <br/>
        </div>
    )
}

export default HomeNavbar;