import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';


function ClientNav() {

  const history = useNavigate();

  const toHome = () => {
      // Update the route
      let path = '/dashboard';
      history(path);
  };

    return (
    <div>
    <Navbar bg="light" expand="lg" className="ms-auto">
      <Container>
        <Navbar.Brand onClick={toHome}>
        <img src="./final-logo.png" alt="bug" height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Logout" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
   
    )
}

export default ClientNav;