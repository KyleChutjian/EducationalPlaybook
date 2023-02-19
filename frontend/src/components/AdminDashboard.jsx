import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from '../services/authService';
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AdminNav from '../components/AdminNav';
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { getUserByUserId, getDashboardsByUserId } from '../services/userService';
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

function AdminDashboard() {
  const history = useNavigate();

  const [ adminFirstName, setAdminFirstName ] = useState("");
  const [ hideProgramLeadDashboard, setHideProgramLeadDashboard ] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();

    // Gets the user's first name for the "Welcome, [Name]"
    getUserByUserId(currentUser.id).then((res) => {
      setAdminFirstName(res.data.firstName);
    });

    getDashboardsByUserId(currentUser.id).then((res) => {
      if (res.data.includes("ProgramLead")) {
        setHideProgramLeadDashboard(false);
      }
    })
  });

  // Button Handling
  const toClientDash = () => {
      // Update the route
      let path = '/dashboard';
      history(path);
  };
  const toPLDash = () => {
    // Update the route
    let path = '/PLdashboard';
    history(path);
  };
  const pendingIntakes = () => {
    // Update the route
    let path = '/pendingIntakes';
    history(path);
  };
  const approvedIntakes = () => {
    // Update the route
    let path = '/approvedIntakes';
    history(path);
  };
  const archivedIntakes = () => {
    // Update the route
    let path = '/archivedIntakes';
    history(path);
  };
  const successRate = () => {
    // Update the route
    let path = '/successRate';
    history(path);
  };
  
  return(  
    <div>
      <div>
        <AdminNav/>
      </div>

      {/* Header, viewing dashboards */}
      <div className="container-fluid text-sm-center p-3 bg-light" style={{fontFamily: 'Bitter'}}>
            <DropdownButton variant='light' size='lg' id="chooseUserType" 
            title={
              <span className="my-auto" style={{color:'black', fontSize:'35px'}}>Admin Dashboard</span>
            }>
            <Dropdown.Item onClick={toClientDash}>Client Dashboard</Dropdown.Item>
            <Dropdown.Item hidden={hideProgramLeadDashboard} onClick={toPLDash}>Program Lead Dashboard</Dropdown.Item>
          </DropdownButton>
          <h3> Welcome, {adminFirstName}!</h3>
      </div> 

      {/* Buttons */}
      <div className="col d-flex justify-content-center">
        <Container id='clientButtonContainer' fluid>

          {/* Card1: Pending Forms */}
          <Card id='card1' className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button1} style={{color:'whitesmoke'}}>
                  {button1Option}
                  </MDBCardLink>  */}
                  <Button onClick={pendingIntakes} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}><u>Pending Forms</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card2: Approved Forms */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button onClick={approvedIntakes} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}><u>Approved Forms</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card3: Archived Forms */}
          <Card id='card3' className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink disabled={disableViewCourse} href='#' style={{color:'whitesmoke'}}>View Course</MDBCardLink>  */}
                <Button onClick={archivedIntakes} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}><u>Archived Forms</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card4: Success Rate */}
          <Card id='card4' className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              {/* <Card.Title style={{fontSize:'30px'}}>
                <MDBCardLink href='#' style={{color:'whitesmoke'}}>View Completed Courses</MDBCardLink> 
              </Card.Title> */}
              <Button onClick={successRate} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}><u>Success Rate</u></Button>
            </Card.Body>
          </Card> 
        </Container>
      </div>
    </div>

  )


//   return(

    
//   <div>
//     <div>
//       <AdminNav/>  
//     </div>
    
//   <div class="container-fluid text-sm-center p-3 bg-light" style={{fontFamily: 'Bitter'}}>
//       <h1>
//       <DropdownButton variant='light' size='lg' id="chooseUserType" 
//       title={
//         <span className="my-auto" style={{color:'black', fontSize:'35px'}}>Administrator Dashboard</span>
//       }>
//         <Dropdown.Item onClick={toClientDash} >Client Dashboard</Dropdown.Item>
//         <Dropdown.Item onClick={toPLDash}>Program Lead Dashboard</Dropdown.Item>
//       </DropdownButton>
//       </h1>
//       <h3> Welcome Tom!</h3>
//   </div> 
//   <div class="col d-flex justify-content-center">


//   <Container fluid>
//     <Card className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
//     <Card.Body>
//       <Card.Title style={{fontSize:'30px'}}>
//         <MDBCardLink href='#' style={{color:'whitesmoke'}}>Pending Forms</MDBCardLink> 
//       </Card.Title>
//     </Card.Body>
//   </Card>

//   <Card className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
//   <Card.Body>
//       <Card.Title style={{fontSize:'30px'}}>
//         <MDBCardLink href='#' style={{color:'whitesmoke'}}>Approved Forms</MDBCardLink> 
//       </Card.Title>
//     </Card.Body>
//   </Card>

//   <Card className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
//   <Card.Body>
//       <Card.Title style={{fontSize:'30px'}}>
//         <MDBCardLink href='#' style={{color:'whitesmoke'}}>Archived Forms</MDBCardLink> 
//       </Card.Title>
//     </Card.Body>
//   </Card>

//   <Card className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
//   <Card.Body>
//       <Card.Title style={{fontSize:'30px'}}>
//         <MDBCardLink href='#' style={{color:'whitesmoke'}}>Success Rate</MDBCardLink> 
//       </Card.Title>
//     </Card.Body>
//   </Card> 
//   </Container>
  

//   </div>
    
//   </div>

// )
}

export default AdminDashboard;