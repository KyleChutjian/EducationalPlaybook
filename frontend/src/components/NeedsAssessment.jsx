import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function NeedsAssessment() {

  const [ adminNavbar, setAdminNavbar ] = useState(false);

  const [ curriculumId, setCurriculumId ] = useState("");
  const [ curriculumTitle, setCurriculumTitle ] = useState("");
  
    return(
        <div>
          <div>
          {adminNavbar ? <AdminNav/> : <ClientNav/>}
          </div>

          {/* Jumbotron */}
          <div className='p-5 text-center' style={{backgroundColor: '#6E9A35', color:'whitesmoke'}}>
          <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>Needs Assessment {curriculumTitle}</h1>
          </div>

          {/* Assessment Cards */}
          <div className="col d-flex justify-content-center">
              <Card id='card1' className="text-right mx-auto" style={{width: '60rem', margin:'20px', color:'black', fontFamily: 'Bitter' }}>
                <Card.Header style={{fontSize:'20px'}}> 
                <Form.Label style={{width:'50%', marginLeft:'25%', textAlign:'center'}}>Focus Area: </Form.Label>
                <Form.Control style={{width:'50%', marginLeft:'25%', textAlign:'center'}} type="focusArea" placeholder='ex. Innovation'/> </Card.Header>
                <Card.Body>

                  <div class="card-block">
                    <div class="row">
                    <Form>
                      <Form.Group className="mb-3" controlId="formFutureState">
                        <Form.Label>Desired Furture State: </Form.Label>
                        <Form.Control type="futureState" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formCurrentState">
                        <Form.Label>Current State: </Form.Label>
                        <Form.Control type="currentState" placeholder=''/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formCurrentState">
                        <Form.Label>Identified Gap: </Form.Label>
                        <Form.Control type="currentState" placeholder='ex. 40%'/>
                      </Form.Group>

                      <Button style={{backgroundColor: '#6E9A35', justifyContent:'center'}} variant="primary" type="submit">Save</Button>
                    </Form>
                       
                    </div>
                  </div>
    
                </Card.Body>
              </Card>
                
          </div>

                <div class='row'>
                  <div class='col'>
                    <Button style={{backgroundColor: '#0098C3', fontFamily: 'Bitter', justifyContent:'center', marginLeft:'48%'}} type="submit">New</Button>
                  </div>   
                </div>
                <br/>
                <br/>

        </div>
  )
}

export default NeedsAssessment;