import React, {useState} from 'react'
// import { NavLink } from 'react-router-dom'
import SearchBar from './searchbar/SearchBar'
import '../Nav/Nav.css'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";


function Navigation() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (

    <Navbar className="navigation" expand="lg">
      <Container fluid>
        <Navbar.Brand className="main-title" href="/">Digital Democracy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
          <Nav.Link className="pcf-link" href="/comparison">Comparison</Nav.Link>
          
          <Nav.Link className="pcf-link" href="/districtmap">Map</Nav.Link>

        {isLoggedIn &&


            <NavDropdown className="profile-link" title="Profile" id="navbarScrollingDropdown">
              <NavDropdown.Item href="">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/signout">
                Signout
              </NavDropdown.Item>
            </NavDropdown>
        }

        {!isLoggedIn &&
          <Nav.Link className="pcf-link" href="/login">Login</Nav.Link>
        }         
          </Nav>
          <SearchBar />
            
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          {/* </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation