import React, { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import ClientNav from '../components/ClientNav';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { MDBCardLink } from 'mdb-react-ui-kit';
import { getCurrentUser } from '../services/authService';
import { getOpenIntakeByClientId } from '../services/intakeService';
import { getUserByUserId, getDashboardsByUserId } from '../services/userService';

function Dashboard() {
  const history = useNavigate();

  const [ curriculumName, setCurriculumName ] = useState("");
  
  
  useEffect(() => {

    // Get current user
    const currentUser = getCurrentUser();

    // Gets the user's first name for the "Welcome, [Name]"
    // getUserByUserId(currentUser.id).then((res) => {
    //   setClientFirstName(res.data.firstName);
    // });

    // Gets Permissible Dashboard options
    // getDashboardsByUserId(currentUser.id).then((res) => {
    //   // console.log(res.data);
    //   res.data.forEach((element) => {
    //     switch(element) {
    //       case "Admin":
    //         setHideAdminDashboard(false);
    //         break;
    //       case "ProgramLead":
    //         setHideProgramLeadDashboard(false);
    //         break;

    //       default:
    //         break;
    //     }
    //   })
    // });

    // Use ClientId to get Open Intake
    getOpenIntakeByClientId(currentUser.id).then((result) => {
      const currentIntake = result.data[0];
      localStorage.setItem("currentIntakeId", currentIntake._id);
      setCurriculumName(`Curriculum Development Plan: ${currentIntake.name}`)

      // let status = "pending-client"
      // if (typeof currentIntake !== "undefined") {
      //   status = currentIntake.status;
      // }
      
      // setCurrentStatus(status);
      // switch (status) {
      //   case "pending-client":
      //     if (typeof currentIntake === "undefined") {
      //       setButton1Option("Submit New Intake");
      //     } else {
      //       setButton1Option("Edit Intake");
      //     }
      //     setDisableNeedsAssessment(true);
      //     setDisableViewCourse(true);
      //     break;
      //   case "pending-admin":
      //   case "pending-programlead":
      //     setButton1Option("View Pending Intake");
      //     setDisableNeedsAssessment(true);
      //     setDisableViewCourse(true);
      //     break;
      //   case "approved":
      //     setButton1Option("View Approved Intake");
      //     setDisableNeedsAssessment(false);
      //     setDisableViewCourse(false);
      //     break;
      //   default:
      //     console.log("Something went wrong, intake status is not open");
      //     break;
      // }
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
  // const toAdminDash = () => {
  //     // Update the route
  //     let path = '/AdminDashboard';
  //     localStorage.setItem("permission-level", "admin");
  //     history(path);
  // };
  // const toPLDash = () => {
  //   // Update the route
  //   let path = '/PLdashboard';
  //   localStorage.setItem("permission-level", "programlead");
  //   history(path);
  // };

    
  return(  
    <div>
      <div>
        <ClientNav/>
      </div>

      {/* Header, name of curriculum development plan */}
      <div className='p-5 text-center' style={{backgroundColor: "lightslategrey"}}>
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
                  <Button onClick={viewIntakeButton} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}><u>View Intake</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card2: NeedsAssessment */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button onClick={needsAssessmentButton} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}><u>Needs Assessment</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card3: Course */}
          <Card id='card3' className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink disabled={disableViewCourse} href='#' style={{color:'whitesmoke'}}>View Course</MDBCardLink>  */}
                <Button onClick={viewCourseButton} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}><u>View Course</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>
        </Container>
      </div>


            {/* Header, viewing dashboards */}
      {/* <div className="container-fluid text-sm-center p-3 bg-light" style={{fontFamily: 'Bitter'}}>
            <DropdownButton disabled={hideAdminDashboard && hideProgramLeadDashboard} variant='light' size='lg' id="chooseUserType" 
            title={
              <span className="my-auto" style={{color:'black', fontSize:'35px'}}>Client Dashboard</span>
            }>
            <Dropdown.Item hidden={hideAdminDashboard} onClick={toAdminDash}>Admin Dashboard</Dropdown.Item>
            <Dropdown.Item hidden={hideProgramLeadDashboard} onClick={toPLDash}>Program Lead Dashboard</Dropdown.Item>
          </DropdownButton>
          <h3> Welcome, {clientFirstName}!</h3>
      </div>  */}
    </div>

  )
}

export default Dashboard;