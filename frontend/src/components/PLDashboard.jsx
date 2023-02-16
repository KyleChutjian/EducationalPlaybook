import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/authService';
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AdminNav from '../components/AdminNav';
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

function PLDashboard() {

  
    return(

      
    <div>
      <div>
       <AdminNav/>  
      </div>
     
    <div class="container-fluid text-sm-center p-3 bg-light" style={{fontFamily: 'Bitter'}}>
        <h1>
        <DropdownButton variant='light' size='lg' id="chooseUserType" 
        title={
          <span className="my-auto" style={{color:'black', fontSize:'35px'}}>Program Lead Dashboard</span>
        }>
         <Dropdown.Item href="#/action-1">Client Dashboard</Dropdown.Item>
         <Dropdown.Item href="#/action-2">Admin Dashboard</Dropdown.Item>
       </DropdownButton>
        </h1>
        <h3> Welcome Program Lead!</h3>
    </div> 
    <div class="col d-flex justify-content-center">


    <Container fluid>
     <Card className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
     <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>
          <MDBCardLink href='#' style={{color:'whitesmoke'}}>Pending Forms</MDBCardLink> 
        </Card.Title>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
    <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>
          <MDBCardLink href='#' style={{color:'whitesmoke'}}>Approved Forms</MDBCardLink> 
        </Card.Title>
      </Card.Body>
    </Card>

    <Card className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
    <Card.Body>
        <Card.Title style={{fontSize:'30px'}}>
          <MDBCardLink href='#' style={{color:'whitesmoke'}}>Archived Forms</MDBCardLink> 
        </Card.Title>
      </Card.Body>
    </Card>
    </Container>
    

    </div>
      
    </div>

  )
}

export default PLDashboard;