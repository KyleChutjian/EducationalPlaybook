import React from 'react'
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import "bootstrap-icons/font/bootstrap-icons.css";
import { logoutUser } from '../services/authService';



function ClientNav() {

  const history = useNavigate();

  const toHome = () => {
      // Update the route
      let path = '/dashboard';
      history(path);
  };
  const handleLogout = () => {
    logoutUser();
    history("/logout");
  }

    return (
    <div>
    <Navbar bg="light" expand="lg" className="ms-auto" style={{borderBottom:"1px"}}>
      <Container>
        <Navbar.Brand onClick={toHome}>
        <img src="./cropped-logo.png" alt="bug" height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={<i className="bi bi-person"></i>} id="basic-nav-dropdown" style={{fontSize:'25px'}}>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
   
    )
}

export default ClientNav;