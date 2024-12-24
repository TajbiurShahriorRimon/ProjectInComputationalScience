import React, {useEffect, useState} from "react";
import {NavDropdown, Container, Nav, Navbar, Form, FormControl, Button} from "react-bootstrap";
import {ImSearch, ImHeart} from "react-icons/im";
import {HiOutlineLogout} from "react-icons/hi";
import {CgProfile, CgShoppingCart, CgBox, CgAdd, CgViewGrid, CgUserList, CgMenuBoxed, CgList, CgChart} from "react-icons/cg";
import {MdReviews} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";

export const AdminNavbar = () => {
    var navigate = useNavigate();

    const [adminNav,setAdminNav]=useState({
        adminNavbar: (<div></div>)
    })
    
    useEffect(() => {
        if (localStorage.getItem("userType_session") == "admin"){
            setAdminNav({
                adminNavbar: (
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
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                                onChange={setSearchValue}
                                            />
                                            <Button onClick={searchProducts} variant="outline-success"><ImSearch/></Button>
                                        </Form>
                                        <Nav.Link href="" className="d-flex"> <CgShoppingCart style={{fontSize:"1.5em"}}/> </Nav.Link>
                                    </Nav>
                                    <Nav defaultActiveKey="/home" as="ul">
                                        <NavDropdown title="Manage Data" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/aManageUsers">Manage Users <CgUserList style={{color:"blue"}}/></NavDropdown.Item>
                                            <NavDropdown.Item href="/order/pending">Pending Orders <CgMenuBoxed style={{color:"green"}}/></NavDropdown.Item>
                                            <NavDropdown.Item href="/category/countProducts">Products by Category <CgList style={{color:"purple"}}/></NavDropdown.Item>
                                            <NavDropdown.Item href="/order/yearlySales">Yearly Sales <CgChart style={{color:"orange"}}/></NavDropdown.Item>
                                        
                                        </NavDropdown>

                                        <NavDropdown title="Category" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/aAddCategory">Add Category <CgAdd style={{color:"blue"}}/></NavDropdown.Item>
                                        <NavDropdown.Item href="/aManagecategory">View Categories <CgViewGrid style={{color:"green"}}/> </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/customer/profile">My Account <CgProfile style={{color:"blue"}}/></NavDropdown.Item>
                                        
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/logout">Log Out <HiOutlineLogout style={{color:"red"}}/></NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>
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


    return (
        <div>
            {adminNav.adminNavbar}
            {/*<Navbar bg="dark" expand="lg" variant="dark" fixed="top" className="navbar text-opacity-100">
                <Container>
                    <Navbar.Brand href="/home">Dokan</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-center" style={{ flex: 1}}>
                        </Nav>
                        <Nav.Link href="/admin">Home</Nav.Link>
                        <Nav.Link href="#">Profile</Nav.Link>
                        <Nav.Link href="/aManageUsers">Manage Users</Nav.Link>
                        <NavDropdown title="Product Category" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/aAddCategory">Add Category <CgAdd style={{color:"blue"}}/></NavDropdown.Item>
                            <NavDropdown.Item href="/aManagecategory">View Categories <CgViewGrid style={{color:"green"}}/> </NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                        <Nav.Link href="/logout">Log Out <HiOutlineLogout style={{color:"red"}}/></Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/> <br/> <br/>*/}
        </div>
    )
}