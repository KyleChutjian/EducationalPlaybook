import React, { useState, useEffect } from 'react'
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
import { getIntakeByIntakeId, editNeedsAssessmentByIntakeId } from '../services/intakeService';
// import {
//   Async,
//   FieldFeedback,
//   FieldFeedbacks,
//   FormWithConstraints,
//   Input
// } from 'react-form-with-constraints-bootstrap';



import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTextArea
}
from 'mdb-react-ui-kit';

function NeedsAssessment() {

  const [ adminNavbar, setAdminNavbar ] = useState(false);

  
  const [ intakeTitle, setIntakeTitle ] = useState("");
  const [ currentIntakeId, setCurrentIntakeId] = useState(localStorage.getItem("currentIntakeId"));

  const [ needsAssessmentData, setNeedsAssessmentData ] = useState("");
  const [ needsAssessmentCards, setNeedsAssesmentCards ] = useState(<div></div>);

  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }

    // Get Curriculum using CurrentIntakeId
    getIntakeByIntakeId(currentIntakeId).then((intake) => {
      setCurrentIntakeId(intake.data._id);
      setIntakeTitle(`Needs Assessment: ${intake.data.name}`);
      setNeedsAssessmentData(intake.data.needsAssessment);
      loadNeedsAssessmentCards(intake.data.needsAssessment);
    });
      
  }, [currentIntakeId]);


  const loadNeedsAssessmentCards = (cards) => {
    setNeedsAssesmentCards(
      cards.map((card, index) => {
        return(
          <div className="container" key={`${card[0]}${index}`}>
            <div className="col d-flex justify-content-center">
              <Card id='card1' className="text-right mx-auto" style={{width: '60rem', margin:'20px', color:'black', fontFamily: 'Bitter' }}>
                <Card.Header style={{fontSize:'20px'}}> 
                <Form.Label style={{width:'50%', marginLeft:'25%', textAlign:'center'}}>Focus Area: </Form.Label>
                <Form.Control required style={{width:'50%', marginLeft:'25%', textAlign:'center'}} defaultValue={card[0]} type="focusArea" placeholder='ex. Innovation' name={`focus${index}`} onChange={handleNeedsAssessmentResponseChange}/> </Card.Header>
                <Card.Body>

                  <div className="card-block">
                    <div className="row">
                    <Form>
                      <Form.Group className="mb-3" controlId="formCurrentState">
                        <Form.Label>Current State: </Form.Label>
                        <Form.Control type="currentState" placeholder='Only 10% of our developer resources are working on new features' defaultValue={card[2]} name={`current${index}`} onChange={handleNeedsAssessmentResponseChange}/>
                        <Form.Text id="subtext" muted>
                          Describe the current state of resources for this focus area
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formFutureState">
                        <Form.Label>Desired Future State: </Form.Label>
                        <Form.Control type="futureState" defaultValue={card[1]} name={`future${index}`} onChange={handleNeedsAssessmentResponseChange} placeholder='At least 50% of our developer resources working on new features'/>
                        <Form.Text id="subtext" muted required>
                          Describe the desired allocated resources for this focus area
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formCurrentState">
                        <Form.Label>Identified Gap: </Form.Label>
                        <Form.Control type="currentState" defaultValue={card[3]} name={`gap${index}`} placeholder='ex. 40%' onChange={handleNeedsAssessmentResponseChange}/>
                        <Form.Text id="subtext" muted>
                          Identify the gap as a percentage (the difference between your current and desired states)
                        </Form.Text>
                      </Form.Group>
                    </Form>
                       
                    </div>
                  </div>
    
                </Card.Body>
              </Card>
                
          </div>
          </div>
        )
      }
    ))
  }

  const handleNeedsAssessmentResponseChange = (e) => {
    const { name, value} = e.target;
    let indexString, index;
    setNeedsAssessmentData((oldData) => {
      if (name.includes("focus")) {
        indexString = name.split("focus")[1];
        index = parseInt(indexString);
        oldData[index][0] = value;
      } else if (name.includes("future")) {
        indexString = name.split("future")[1];
        index = parseInt(indexString);
        
        oldData[index][1] = value;
      } else if (name.includes("current")) {
        indexString = name.split("current")[1];
        index = parseInt(indexString);
        
        oldData[index][2] = value;
      } else if (name.includes("gap")) {
        indexString = name.split("gap")[1];
        index = parseInt(indexString);
        
        oldData[index][3] = value;
      } else {
        console.log("Something went wrong");
      }
      return oldData;
    });
  }

  const saveChanges = () => {
    editNeedsAssessmentByIntakeId(currentIntakeId, {newNeedsAssessment: needsAssessmentData})
  }

  const addNew = (e) => {
    var newNeedsAssessment = needsAssessmentData;
    newNeedsAssessment = needsAssessmentData.concat([['','','','']]);
    setNeedsAssessmentData(newNeedsAssessment);
    loadNeedsAssessmentCards(newNeedsAssessment);
  }

  
    return(
        <div>
          <div>
          {adminNavbar ? <AdminNav/> : <ClientNav/>}
          </div>

          {/* Jumbotron */}
          <div className='p-5 text-center' style={{backgroundColor: '#6E9A35', color:'whitesmoke'}}>
          <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>{intakeTitle}</h1>
          </div>

          {needsAssessmentCards}

          {/* Assessment Cards */}
          {/* <div className="col d-flex justify-content-center">
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
                    </Form>
                       
                    </div>
                  </div>
    
                </Card.Body>
              </Card>
                
          </div> */}

                <div className='row'>
                  {/* <div className='col'> */}
                    <div style={{display: 'flex'}}>
                      <Button style={{backgroundColor: '#0098C3', fontFamily: 'Bitter', marginLeft:'39%', minWidth:'160px', maxHeight:'40px'}} type="submit" onClick={addNew}>Add Focus Area</Button>
                      <Button style={{backgroundColor: '#6E9A35', fontFamily: 'Bitter', marginLeft: '5px', marginRight: '50%', minWidth:'160px', maxHeight:'40px'}} variant="primary" type="submit" onClick={saveChanges}>Save</Button>
                    </div>

                  {/* </div>    */}
                </div>
                <br/>
                <br/>

        </div>
  )
}

export default NeedsAssessment;