import React from 'react'
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import "bootstrap-icons/font/bootstrap-icons.css";
import { logoutUser } from '../services/authService';


function AdminNav() {

  const history = useNavigate();

  const toHome = () => {
      // Update the route
      let path = '/adminDashboard';
      history(path);
  };

  const toManageAccounts = () => {
    // Update the route
    let path = '/ManageAccounts';
    history(path);
  };
  const handleLogout = () => {
    logoutUser();
    history("/logout");
  }

    return (
        <div>
    <Navbar bg="light" expand="lg" className="ms-auto">
      <Container>
        <Navbar.Brand onClick={toHome} >
        <img src="./nav logo2.png" alt="bug" height={70} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown 
              title={<i className="bi bi-gear"></i>} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={toManageAccounts}>Manage Accounts</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>    
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
        </div>
   
    )
}

export default AdminNav;
