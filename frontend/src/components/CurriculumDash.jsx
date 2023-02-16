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
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { ReactComponent as Logo } from './logo.svg';

import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function AdminDashboard() {

  
    return(

      
    <div>
      <Navbar bg="light" expand="lg" className="ms-auto">
      <Container>
        <Navbar.Brand href="#home">
        <img src="./final-ep-logo.png" alt="bug" height={100} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Manage Accounts</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div class="container-fluid text-sm-center p-3 bg-light" style={{fontFamily: 'Bitter'}}>
        <h1> Admin Dashboard</h1>
        <h3> Curriculum #001</h3>
    </div> 
    <div class="col d-flex justify-content-center">

    <Container fluid>
     <Card className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
      <Card.Body>
        <Card.Title>Intake Forms</Card.Title>
        <Card.Text>
          All intake forms that have been submitted will appear here. Once reviewed they may be approved for further data collection.
        </Card.Text>
        <Button variant="light">Review</Button>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
      <Card.Body>
        <Card.Title>Needs Assessment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="light">Analyze</Button>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
      <Card.Body>
        <Card.Title>Course</Card.Title>
        <Card.Text>
          Using the information gathered through intake data and needs assessments, this section can be used to develop a curriculum based on the needs of the hospital community.
        </Card.Text>
        <Button variant="light">Add to course</Button>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
      <Card.Body>
        <Card.Title>Complete Courses</Card.Title>
        <Card.Text>
          Fully developed curriculum plans that have been marked as "complete" will appear here for access at any time.
        </Card.Text>
        <Button variant="light">View</Button>
      </Card.Body>
    </Card> 
    </Container>
    

    </div>
      
    </div>

  )
}

export default AdminDashboard;