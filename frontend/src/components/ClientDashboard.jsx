import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import ClientNav from './ClientNav';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { getCurrentUser } from '../services/authService';
import { getOpenIntakeByClientId } from '../services/intakeService';
import { getUserByUserId, getDashboardsByUserId } from '../services/userService';

function ClientDashboard() {
  const history = useNavigate();

  const [ currentStatus, setCurrentStatus ] = useState();
  const [ button1Option, setButton1Option ] = useState("");
  const [ button1Output, setButton1Output ] = useState("");
  const [ clientFirstName, setClientFirstName ] = useState("");
  const [ hideAdminDashboard, setHideAdminDashboard ] = useState(true);
  const [ hideProjectLeadDashboard, setHideProjectLeadDashboard ] = useState(true);
  
  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    // Get current user
    const currentUser = getCurrentUser();

    // Gets the user's first name for the "Welcome, [Name]"
    getUserByUserId(currentUser.id).then((res) => {
      setClientFirstName(res.data.firstName);
    });

    // Gets Permissible Dashboard options
    getDashboardsByUserId(currentUser.id).then((res) => {
      // console.log(res.data);
      res.data.forEach((element) => {
        switch(element) {
          case "Admin":
            setHideAdminDashboard(false);
            break;
          case "ProjectLead":
            setHideProjectLeadDashboard(false);
            break;

          default:
            break;
        }
      })
    });

    // Use ClientId to get Open Intake
    getOpenIntakeByClientId(currentUser.id).then((result) => {
      const currentIntake = result.data[0];

      let status = "pending-client"
      if (typeof currentIntake !== "undefined") {
        status = currentIntake.status;
      }
      
      setCurrentStatus(status);
      switch (status) {
        case "pending-client":
          if (typeof currentIntake === "undefined") {
            setButton1Option("Submit New Intake");
          } else {
            setButton1Option("Edit Intake");
          }

          setButton1Output("/submitIntake");
          break;
        case "pending-admin":
        case "pending-projectlead":
          setButton1Option("View Pending Intake");
          setButton1Output("/viewintake");
          break;
        case "approved":
          if (typeof currentIntake.name === 'undefined') {
            setButton1Option("View Approved Intake");
          } else {
            setButton1Option(currentIntake.name);
          }
          
          setButton1Output("/dashboard");
          break;
        default:
          console.log("Something went wrong, intake status is not open");
          break;
      }
    });

  }, [currentStatus]);

  // const button1 = () => {
  //   switch (button1Option) {
  //     case "Submit New Intake":
  //     case "Edit Intake":
  //       history("/submitintake");
  //       break;

  //     case "View Pending Intake":
  //     case "View Approved Intake":
  //       history("/viewIntake");
  //       break;

  //     default:
  //       console.error(`Unknown button 1 option: ${button1Option}`);
  //   }

  // };

  const submitProblemButton = () => {
    history(button1Output);
};
 
  const viewCompletedCoursesButton = () => {
      // Update the route
      let path2 = '/archivedintakes';
      history(path2);
  };
  const toAdminDash = () => {
      // Update the route
      let path = '/AdminDashboard';
      localStorage.setItem("permission-level", "admin");
      history(path);
  };
  const toPLDash = () => {
    // Update the route
    let path = '/PLdashboard';
    localStorage.setItem("permission-level", "projectlead");
    history(path);
  };

    
  return(  
    <div>
      <div>
        <ClientNav/>
      </div>

      {/* Header, viewing dashboards */}
      <div className="container-fluid text-sm-center p-3" style={{fontFamily: 'Bitter'}}>
            <DropdownButton disabled={hideAdminDashboard && hideProjectLeadDashboard} variant='light' size='lg' id="chooseUserType" 
            title={
              <span className="my-auto" style={{color:'black', fontSize:'35px'}}>Client Dashboard</span>
            }>
            <Dropdown.Item hidden={hideAdminDashboard} onClick={toAdminDash}>Admin Dashboard</Dropdown.Item>
            <Dropdown.Item hidden={hideProjectLeadDashboard} onClick={toPLDash}>Project Lead Dashboard</Dropdown.Item>
          </DropdownButton>
          <h3> Welcome, {clientFirstName}!</h3>
      </div> 
      <div className="col d-flex justify-content-center">
        <Container id='clientButtonContainer' fluid>

          {/* Card1: [Submit a Problem, View Pending Intake, [Approved Intake Name]] */}
          <Card id='card1' className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'10px', marginTop: '60px',color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                  <Button onClick={submitProblemButton} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>{button1Option}</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card2: Completed Courses */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
             
              <Button onClick={viewCompletedCoursesButton} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Completed Curriculums</Button>
            </Card.Body>
          </Card> 
        </Container>
      </div>
    </div>

  )
}

export default ClientDashboard;