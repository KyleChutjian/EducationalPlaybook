import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import ClientNav from '../components/ClientNav';
import { Button } from 'react-bootstrap';
import { getCurrentUser } from '../services/authService';
import { getOpenIntakeByClientId } from '../services/intakeService';

function Dashboard() {
  const history = useNavigate();

  const [ curriculumName, setCurriculumName ] = useState("");
  
  
  useEffect(() => {

    // Get current user
    const currentUser = getCurrentUser();

    // Use ClientId to get Open Intake
    getOpenIntakeByClientId(currentUser.id).then((result) => {
      const currentIntake = result.data[0];
      localStorage.setItem("currentIntakeId", currentIntake._id);
      setCurriculumName(`Curriculum Development Plan: ${currentIntake.name}`)

    });

  }, []);

  const viewIntakeButton = () => {
    history("/viewintake");
    // switch (button1Option) {
    //   case "Submit New Intake":
    //   case "Edit Intake":
    //     history("/submitintake");
    //     break;

    //   case "View Pending Intake":
    //   case "View Approved Intake":
    //     history("/viewIntake");
    //     break;

    //   default:
    //     console.error(`Unknown button 1 option: ${button1Option}`);
    // }

  };
  const needsAssessmentButton = () => {
    // Update the route
    let path2 = '/needsassessment';
    history(path2);
  };
  const viewCourseButton = () => {
    // Update the route
    let path2 = '/curriculum';
    history(path2);
  };

    
  return(  
    <div>
      <div>
        <ClientNav/>
      </div>

      {/* Header, name of curriculum development plan */}
      <div className='p-5 text-center'>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>{curriculumName}</h1>
      </div>


      <div className="col d-flex justify-content-center">
        <Container id='clientButtonContainer' fluid>

          {/* Card1: [Submit New Intake, Edit Intake, View Pending Intake, View Approved Intake] */}
          <Card id='card1' className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', marginTop:'1%',color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button1} style={{color:'whitesmoke'}}>
                  {button1Option}
                  </MDBCardLink>  */}
                  <Button onClick={viewIntakeButton} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>View Intake</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card2: NeedsAssessment */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button onClick={needsAssessmentButton} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Needs Assessment</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card3: Course */}
          <Card id='card3' className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink disabled={disableViewCourse} href='#' style={{color:'whitesmoke'}}>View Course</MDBCardLink>  */}
                <Button onClick={viewCourseButton} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Curriculum</Button>
              </Card.Title>
            </Card.Body>
          </Card>
        </Container>
      </div>

    </div>

  )
}

export default Dashboard;