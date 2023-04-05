import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getCurriculumByIntakeId } from '../services/curriculumService';

function CurriculumDash() {
  const history = useNavigate();
  const [ curriculumTitle, setCurriculumTitle ] = useState("");
  const [ adminNavbar, setAdminNavbar ] = useState(false);
  //localStorage.setItem("currentIntakeId", "63f52c4d02554f88c031c537"); // TEMPORARY, waiting for sadjell
  const [ currentIntakeId, setCurrentIntakeId] = useState(localStorage.getItem("currentIntakeId"));
  
  useEffect(() => {

    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    } else if (permissionLevel === "projectlead") {
      setAdminNavbar(false);
    }

    getCurriculumByIntakeId(currentIntakeId).then((res) => {
      setCurriculumTitle(`Curriculum Development Plan: ${res.data.name}`)
    });

  }, [currentIntakeId]);

  const intakeData = () => {
    // Update the route
    let path = '/viewintake';
    history(path);
  };
  const needsAssessment = () => {
    // Update the route
    let path = '/needsAssessment';
    history(path);
  };
  const viewCourse = () => {
    // Update the route
    let path = '/curriculum';
    history(path);
  };
  const editCourse = () => {
    // Update the route
    let path = '/editcurriculum';
    history(path);
  };

  return(  
    <div>
      <div>
        {adminNavbar ? <AdminNav/> : <ClientNav/>}
      </div>
      {/* Jumbotron */}
      <div className='p-5 text-center'>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>{curriculumTitle}</h1>
      </div>
      {/* Buttons */}
      <div className="col d-flex justify-content-center" style={{paddingTop: "0.5%"}}>
        <Container id='clientButtonContainer' fluid>

          {/* Card1: Intake Data */}
          <Card id='card1' className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button1} style={{color:'whitesmoke'}}>
                  {button1Option}
                  </MDBCardLink>  */}
                  <Button onClick={intakeData} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Intake Data</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card2: Needs Assessment */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button onClick={needsAssessment} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Needs Assessment</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card3: Curriculum */}
          <Card id='card3' className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink disabled={disableViewCourse} href='#' style={{color:'whitesmoke'}}>View Course</MDBCardLink>  */}
                <Button onClick={viewCourse} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Curriculum</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card4: Success Rate */}
          {/* <Card id='card4' className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              <Button onClick={editCourse} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Edit Curriculum</Button>
            </Card.Body>
          </Card>  */}
        </Container>
      </div>
    </div>

  )  

  //   return(

      
  //   <div>
  //     <Navbar bg="light" expand="lg" className="ms-auto">
  //     <Container>
  //       <Navbar.Brand href="#home">
  //       <img src="./final-ep-logo.png" alt="bug" height={100} />
  //       </Navbar.Brand>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //       <Navbar.Collapse id="basic-navbar-nav">
  //         <Nav className="ms-auto">
  //           <Nav.Link href="#home">Home</Nav.Link>
  //           <Nav.Link href="#link">Link</Nav.Link>
  //           <NavDropdown title="Settings" id="basic-nav-dropdown">
  //             <NavDropdown.Item href="#action/3.1">Manage Accounts</NavDropdown.Item>
  //             <NavDropdown.Item href="#action/3.2">
  //               Another action
  //             </NavDropdown.Item>
  //             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
  //             <NavDropdown.Divider />
  //             <NavDropdown.Item href="#action/3.4">
  //               Separated link
  //             </NavDropdown.Item>
  //           </NavDropdown>
            
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  //   <div class="container-fluid text-sm-center p-3 bg-light" style={{fontFamily: 'Bitter'}}>
  //       <h1> Admin Dashboard</h1>
  //       <h3> Curriculum #001</h3>
  //   </div> 
  //   <div class="col d-flex justify-content-center">

  //   <Container fluid>
  //    <Card className="text-center mx-auto" style={{ background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
  //     <Card.Body>
  //       <Card.Title>Intake Forms</Card.Title>
  //       <Card.Text>
  //         All intake forms that have been submitted will appear here. Once reviewed they may be approved for further data collection.
  //       </Card.Text>
  //       <Button variant="light">Review</Button>
  //     </Card.Body>
  //   </Card>

  //   <Card className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
  //     <Card.Body>
  //       <Card.Title>Needs Assessment</Card.Title>
  //       <Card.Text>
  //         With supporting text below as a natural lead-in to additional content.
  //       </Card.Text>
  //       <Button variant="light">Analyze</Button>
  //     </Card.Body>
  //   </Card>

  //   <Card className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
  //     <Card.Body>
  //       <Card.Title>Course</Card.Title>
  //       <Card.Text>
  //         Using the information gathered through intake data and needs assessments, this section can be used to develop a curriculum based on the needs of the hospital community.
  //       </Card.Text>
  //       <Button variant="light">Add to course</Button>
  //     </Card.Body>
  //   </Card>

  //   <Card className="text-center mx-auto" style={{ background: '#a40084', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
  //     <Card.Body>
  //       <Card.Title>Complete Courses</Card.Title>
  //       <Card.Text>
  //         Fully developed curriculum plans that have been marked as "complete" will appear here for access at any time.
  //       </Card.Text>
  //       <Button variant="light">View</Button>
  //     </Card.Body>
  //   </Card> 
  //   </Container>
    

  //   </div>
      
  //   </div>

  // )
}

export default CurriculumDash;