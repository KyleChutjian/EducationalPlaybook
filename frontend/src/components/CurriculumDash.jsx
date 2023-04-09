import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getCurriculumByIntakeId } from '../services/curriculumService';
import Modal from 'react-bootstrap/Modal';
import { getIntakeByIntakeId } from '../services/intakeService';

function CurriculumDash() {
  const history = useNavigate();
  const [ curriculumTitle, setCurriculumTitle ] = useState("");
  const [ adminNavbar, setAdminNavbar ] = useState(false);
  const [isRadio1Visible, setIsRadio1Visible] = useState(false);
  const [isRadio2Visible, setIsRadio2Visible] = useState(false);
  const [check, setIsBoxChecked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus ] = useState("");
   // TEMPORARY, waiting for sadjell
  //const [ currentIntakeId, setCurrentIntakeId] = useState(localStorage.getItem("currentIntakeId"));
  const [currentIntakeId, setCurrentIntakeId] = useState(localStorage.setItem("currentIntakeId", "64332c606ad1113507499c63"));

  const radioResponse3HTML = <div class = "button-approved">Submit</div>;
  
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

  const [open, setOpen] = useState(false);


    // Handles Logging in
    function handleSubmit(e) {
        e.preventDefault();
       
    }

    // Handles Create New Account Submission
    const submitModal = (e) => {
      if (success == true){
        getIntakeByIntakeId(currentIntakeId).then((result) => {
          setStatus("archived-success");
        });

      }
      else{
        getIntakeByIntakeId(currentIntakeId).setStatus("archived-fail");

      }
      console.log(currentIntakeId.status);
      e.preventDefault();
      setOpen(false);
     
    };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);


  function handleRadioButtons(e) {
    const name = e.target.name; // Radio1/Radio2
    const value = e.target.value; // Yes/No

    if (name === "radio1") {
        if (value === "yes") {
          console.log(`opening ${name} response`);
          setIsRadio1Visible(true);
        } else {
          console.log(`closing ${name} response`);
          setIsRadio1Visible(false);
        }
    }

    if (name === "radio2") {
      if (value === "yes") {
        console.log(`opening ${name} response`);
        setIsRadio2Visible(true);
        setSuccess(true);
      } else {
        console.log(`closing ${name} response`);
        setIsRadio2Visible(false);
      }
  }

  }

  function handleCheckBox(e){
    setIsBoxChecked(e.target.checked);
  }

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

          {/* Card3: Archive Intake */}
          <Card id='card3' className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink disabled={disableViewCourse} href='#' style={{color:'whitesmoke'}}>View Course</MDBCardLink>  */}
                <Button onClick={handleOpenModal} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Archive Intake</Button>
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

        <div className="mb-3">
              <Modal show={open} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Archive Intakes</Modal.Title>
                </Modal.Header>
                  <Modal.Body>

                   <div>
                    <h4>Confirm to archive intake form:</h4>
                   
                    {/* Data: Yes */}
                    <div className="yes">
                    <label htmlFor='yes'>Yes</label>
                    <input type='radio' id='yes' name='radio1' value='yes' onClick={handleRadioButtons}/>
                    </div>
                    {/* Identified Problem: No */}
                    <div className="no">
                    <label htmlFor='no'>No</label>
                    <input defaultChecked={true} type='radio' id='no' name='radio1' value='no' onClick={handleRadioButtons}/>

                    </div>
                    {/*isRadio2Visible ? radioResponse2HTML : null*/}

                   </div>


                   <div>
                    <h4>Was this intake considered successful?</h4>
                   
                    {/* Data: Yes */}
                    <div className="yes">
                    <label htmlFor='yes'>Yes</label>
                    <input type='radio' id='yes' name='radio2' value='yes' onClick={handleRadioButtons}/>
                    </div>
                    {/* Identified Problem: No */}
                    <div className="no">
                    <label htmlFor='no'>No</label>
                    <input defaultChecked={true} type='radio' id='no' name='radio2' value='no' onClick={handleRadioButtons}/>

                    </div>
                    

                   </div>

                   <div>
                  
                   
                    {/* Data: Yes */}
                    <div className="yes">
                    <input defaultChecked={false} type='checkbox' id='yes' name='check' onChange={handleCheckBox}/>
                    <label htmlFor='check'>I understand</label>
                    </div>
                  
                    
                   </div>
                  

                    

                    
                      
                    
                  </Modal.Body>
                  

                  <Modal.Footer>
                    <Button disabled = {!check} style={{background:'#6E9A35'}} onClick={submitModal}>Submit</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  </Modal.Footer>

              </Modal>
          </div>
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