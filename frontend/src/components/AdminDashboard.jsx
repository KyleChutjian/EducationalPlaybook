import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../services/authService';
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AdminNav from '../components/AdminNav';
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { getUserByUserId, getDashboardsByUserId } from '../services/userService';


function AdminDashboard() {
  const history = useNavigate();

  const [ adminFirstName, setAdminFirstName ] = useState("");
  const [ hideProjectLeadDashboard, setHideProjectLeadDashboard ] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    const permissionLevel = localStorage.getItem("permission-level");
    if (!currentUser.isAdmin) {
      if (permissionLevel === "projectlead") {
        history("/pldashboard");
      } else if (permissionLevel === "client") {
        history("/clientdashboard");
      }
    }

    // Gets the user's first name for the "Welcome, [Name]"
    getUserByUserId(currentUser.id).then((res) => {
      setAdminFirstName(res.data.firstName);
    });

    getDashboardsByUserId(currentUser.id).then((res) => {
      if (res.data.includes("ProjectLead")) {
        setHideProjectLeadDashboard(false);
      }
    });
  });

  // Button Handling
  const toClientDash = () => {
      // Update the route
      let path = '/clientDashboard';
      localStorage.setItem("permission-level", "client");
      history(path);
  };
  const toPLDash = () => {
    // Update the route
    let path = '/PLdashboard';
    localStorage.setItem("permission-level", "projectlead");
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
            <Dropdown.Item hidden={hideProjectLeadDashboard} onClick={toPLDash}>Project Lead Dashboard</Dropdown.Item>
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
                  <Button onClick={pendingIntakes} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Pending Forms</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card2: Approved Forms */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                <Button onClick={approvedIntakes} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Approved Forms</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card3: Archived Forms */}
          <Card id='card3' className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                <Button onClick={archivedIntakes} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Archived Forms</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card4: Success Rate */}
          <Card id='card4' className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              <Button onClick={successRate} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Success Rate</Button>
            </Card.Body>
          </Card> 
        </Container>
      </div>
    </div>
  )
}

export default AdminDashboard;