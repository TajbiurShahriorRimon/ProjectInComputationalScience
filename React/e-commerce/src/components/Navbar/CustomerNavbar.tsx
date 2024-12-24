import React, {useEffect, useState} from "react";
import {NavDropdown, Container, Nav, Navbar, Form, FormControl, Button} from "react-bootstrap";
import {ImSearch, ImHeart} from "react-icons/im";
import {HiOutlineLogout} from "react-icons/hi";
import {CgProfile, CgShoppingCart, CgBox} from "react-icons/cg";
import {MdReviews} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "reactstrap";

export const CustomerNavbar = () => {
    var navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("userType_session") == "customer")
        setNav1({
            tabNav: (
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
                                    <Form className="d-flex align-content-md-center position-fixed">
                                        <FormControl
                                            type="text"
                                            placeholder="Search"
                                            aria-label="Search"
                                            onChange={setSearchVale}
                                        />
                                        <Button onClick={searchProducts} variant="outline-success"><ImSearch/></Button>
                                    </Form>
                                    <Nav.Link href="" className="d-flex"> <CgShoppingCart style={{fontSize:"1.5em"}}/> </Nav.Link>
                                </Nav>
                                <Nav.Link href="/customer/index">Home</Nav.Link>
                                <Nav.Link href="/shoppingCart"> My Cart <CgShoppingCart/></Nav.Link>
                                <NavDropdown title="Customer" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/customer/profile">My Account <CgProfile style={{color:"blue"}}/></NavDropdown.Item>
                                    <NavDropdown.Item href="/order/customer">My Orders <CgBox/> </NavDropdown.Item>
                                  
                                    <div className="dropdown-item">
                                        <Link to={"/shoppingCart"}>
                                            My Cart <CgShoppingCart/>
                                        </Link>
                                    </div>

                                    {/*<NavDropdown.Item href="#action/3.3">My Reviews <MdReviews/> </NavDropdown.Item>*/}

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/logout">Log Out <HiOutlineLogout style={{color:"red"}}/></NavDropdown.Item>
                                </NavDropdown>
                                
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <br/> <br/> <br/><br/> <br/> <br/>
                </div>
            ),
        })
    }, [])

    const [nav1,setNav1]=useState({
        tabNav: (<div></div>)
    })

    const setSearchVale = (e: any) => {
        //alert(e.target.value);
        localStorage.setItem("searchProductSession", e.target.value);
        //alert(localStorage.getItem("searchProductSession"));
    }

    const [search,setSearch]=useState({
        searchField: "",
    })
    const searchProducts = () => {
        //alert('fdf');
        if (localStorage.getItem("searchProductSession") != null){
            if(localStorage.getItem("searchProductSession") == ""){
                alert('prob');
                return
            }
            var key = localStorage.getItem("searchProductSession");
            localStorage.removeItem("searchProductSession");
            //navigate("/product/search/"+key);
            window.location.href = "/product/search/"+key;
            //alert('last');
        }
    }

    return (
        <div>
            {nav1.tabNav}
        </div>
    /*<div>
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top" className="navbar text-opacity-100">
            <Container>
                <Navbar.Brand href="#home">Dokan</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-center" style={{ flex: 1}}>
                        <Form className="d-flex align-content-md-center position-fixed">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={(e)=>{
                                    setSearch({searchField:e.target.value})
                                }}
                            />
                            <Button onClick={searchProducts} variant="outline-success"><ImSearch/></Button>
                        </Form>
                        <Nav.Link href="" className="d-flex"> <CgShoppingCart style={{fontSize:"1.5em"}}/> </Nav.Link>
                    </Nav>
                    <Nav.Link href="/customer/index">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Mr XYZ" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/customer/profile">My Account <CgProfile style={{color:"blue"}}/></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">My Wishlist <ImHeart/> </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">My Orders <CgBox/> </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">My Reviews <MdReviews/> </NavDropdown.Item>
                        <div className="dropdown-item">
                            <Link to={"/shoppingCart"}>
                                My Cart <CgShoppingCart/>
                            </Link>
                        </div>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout">Log Out <HiOutlineLogout style={{color:"red"}}/></NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br/> <br/> <br/>
    </div>*/
    )
}