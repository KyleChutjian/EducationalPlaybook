import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ClientNav from '../components/ClientNav';
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';

// import { ReactComponent as Logo } from './logo.svg';

import {
  MDBContainer,
  MDBCardLink,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function Dashboard() {

  const history = useNavigate();

    const routeChange = () => {
        // Update the route
        let path = '/intake';
        history(path);
    };

    const routeChange2 = () => {
      // Update the route
      let path2 = '/needsassessment';
      history(path2);
    };

    const toAdminDash = () => {
        // Update the route
        let path = '/AdminDashboard';
        history(path);
    };
  
    const toPLDash = () => {
      // Update the route
      let path = '/PLdashboard';
      history(path);
    };




  
    return(  
    <div>
      <div>
        <ClientNav/>
      </div>
    <div class="container-fluid text-sm-center p-3 bg-light" style={{fontFamily: 'Bitter'}}>
        <h1> 
        <h1>
        <DropdownButton variant='light' size='lg' id="chooseUserType" 
        title={
          <span className="my-auto" style={{color:'black', fontSize:'35px'}}>Client Dashboard</span>
        }>
         <Dropdown.Item onClick={toAdminDash}>Admin Dashboard</Dropdown.Item>
         <Dropdown.Item onClick={toPLDash}>Program Lead Dashboard</Dropdown.Item>
       </DropdownButton>
        </h1>
        </h1>
        <h3> Welcome client!</h3>
    </div> 
    <div class="col d-flex justify-content-center">
    
    <Container fluid>
     <Card id='submit' className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
      <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>
          <MDBCardLink onClick={routeChange} style={{color:'whitesmoke'}}>Submit Intake</MDBCardLink> 
        </Card.Title>
      </Card.Body>
    </Card>

    <Card id='needsassess' className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
    <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>
          <MDBCardLink onClick={routeChange2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink> 
        </Card.Title>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
    <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>
          <MDBCardLink href='#' style={{color:'whitesmoke'}}>Course</MDBCardLink> 
        </Card.Title>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
    <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>
          <MDBCardLink href='#' style={{color:'whitesmoke'}}>Complete Courses</MDBCardLink> 
        </Card.Title>
      </Card.Body>
    </Card> 
    </Container>
    
    </div>
      
    </div>

  )
}

export default Dashboard;