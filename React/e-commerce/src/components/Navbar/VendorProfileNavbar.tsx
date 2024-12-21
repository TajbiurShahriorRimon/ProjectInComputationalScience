import React from 'react';
import  "./navbar.css";
import {Container, Form, FormControl, Navbar, Nav, Button} from "react-bootstrap";
import {ImSearch} from "react-icons/im";









function VendorProfileNavbar(){
    return(
        /*<div>
            
            <div className='nav-body' 
            >
                <a href="/vHome" className='link'>Vendor</a>
                <nav>
                    <ul className='nav-links'>
                        <li><a href='/vProfile' >Profile</a></li>
                        <li><a href='/vShopInfo'>Shop Info</a></li>
                        <li><a href='/vAddProducts' >Add Products</a></li>
                        <li><a href='#' >Sales Report</a></li>
                    </ul>
                </nav>
            </div> 
        </div>*/

        <div>
            <Navbar bg="dark" expand="lg" variant="dark" fixed="top" className="navbar text-opacity-100">
                <Container>
                    <Navbar.Brand href="/vHome">Vendor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-center" style={{ flex: 1}}>
                        </Nav>
                        <Nav.Link href="/vProfile">Profile</Nav.Link>
                        <Nav.Link href="/vShopInfo">Shop Info</Nav.Link>
                        <Nav.Link href="/vAddProducts">Products</Nav.Link>
                        <Nav.Link href="#">Sales Report</Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/> <br/> <br/>
        </div>
    )
}

export default VendorProfileNavbar;