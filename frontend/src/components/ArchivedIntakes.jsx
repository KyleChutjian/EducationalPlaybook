import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { saveIntake, submitIntake, getIntakebyStatus, adminApproveIntake, programleadApproveIntake, editIntakeByIntakeId } from '../services/intakeService';

import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBTextArea,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function ArchivedIntakes() {

  const history = useNavigate();

  const toArchivedIntake = () => {
    // Update the route
    let path = '/intake';
    history(path);
  };
  const toLogin = () => {
    // Update the route
    let path = '/login';
    history(path);
  };

  
  return(

    <div className="intake-wrapper">
      {/* Navbar */}
      <header style={{ paddingLeft: 0 }}>
      <Navbar bg="light" expand="lg" className="ms-auto">
          <Container>

            <Navbar.Brand href="#home">
              <img src="./final-ep-logo.png" alt="bug" height={100} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
             <Nav className="ms-auto">
               <Nav.Item title="Logout" id="basic-nav" onClick={toLogin}>Logout</Nav.Item>
             </Nav>
           </Navbar.Collapse>
        
          </Container>
        </Navbar>
      </header>
      {/* Jumbotron */}
      <div className='head-pending p-5 text-center'>
        <h1 className='mb-3'>Archived Intake Forms</h1>
      </div>

      <div className="intake-body container" style={{paddingTop: "1%"}}>
        {/* Intake 1 */}
        <div class="rectangle" onClick={toArchivedIntake}>
          <h5 class="d-flex justify-content-center">Intake #001</h5>
        </div>

        {/* Intake 2 */}
        <div class="rectangle">
          <h5 class="d-flex justify-content-center">Intake #002</h5>
        </div>
        

        {/* Question 3 */}
        <div class="rectangle">
          <h5 class="d-flex justify-content-center">Intake #003</h5>
        </div>

        






        <div className="row">
            <div className="col-sm-12 text-center">
              <button className="button-pending center-block">See More</button>
            </div>
          </div>

      </div>
    </div>

    
     
)
}

export default ArchivedIntakes;