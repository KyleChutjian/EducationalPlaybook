import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/authService';
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AdminNav from '../components/AdminNav';
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
      <div>
       <AdminNav/>  
      </div>
     
    <div class="container-fluid text-sm-center p-3 bg-light" style={{fontFamily: 'Bitter'}}>
        <h1> Admin Dashboard</h1>
        <h3> Welcome Tom!</h3>
    </div> 
    <div class="col d-flex justify-content-center">


    <Container fluid>
     <Card className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
      <Card.Body>
        <Card.Title>Pending Forms</Card.Title>
        <Card.Text>
        </Card.Text>
        <Button variant="light">Review</Button>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
      <Card.Body>
        <Card.Title>Approved Forms</Card.Title>
        <Card.Text>
        </Card.Text>
        <Button variant="light">View</Button>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
      <Card.Body>
        <Card.Title>Archived Forms</Card.Title>
        <Card.Text>
        </Card.Text>
        <Button variant="light">View</Button>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
      <Card.Body>
        <Card.Title>Success Rate</Card.Title>
        <Card.Text>
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