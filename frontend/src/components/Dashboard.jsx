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
// import { ReactComponent as Logo } from './logo.svg';

import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function Dashboard() {

  
    return(  
    <div>
      <div>
        <ClientNav/>
      </div>
    <div class="container-fluid text-sm-center p-3 bg-light" style={{fontFamily: 'Bitter'}}>
        <h1> Client Dashboard</h1>
        <h3> Welcome client!</h3>
    </div> 
    <div class="col d-flex justify-content-center">
    
    <Container fluid>
     <Card className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
      <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>Intake Forms</Card.Title>
        <Button variant="light">Submit New</Button>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
      <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>Needs Assessment</Card.Title>
        <Button variant="light" disabled>Analyze</Button>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
      <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>Course</Card.Title>
        <Card.Text>
        </Card.Text>
        <Button variant="light" disabled>View</Button>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
      <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>Complete Courses</Card.Title>
        <Card.Text>
        </Card.Text>
        <Button variant="light" disabled>View</Button>
      </Card.Body>
    </Card> 
    </Container>
    
    </div>
      
    </div>

  )
}

export default Dashboard;