import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getCurriculumByIntakeId } from '../services/curriculumService';
import Modal from 'react-bootstrap/Modal';
import archive from '../resources/archive.png';
import { editIntakeStatusByIntakeId, getIntakeByIntakeId } from '../services/intakeService';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

function CurriculumDash() {
  const history = useNavigate();
  const [ curriculumTitle, setCurriculumTitle ] = useState("");
  const [ adminNavbar, setAdminNavbar ] = useState(false);
  const [isRadio1Visible, setIsRadio1Visible] = useState(false);
  const [isRadio2Visible, setIsRadio2Visible] = useState(false);
  const [check, setIsBoxChecked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus ] = useState("");

  const radioResponse3HTML = <div class = "button-approved">Submit</div>;
  const [ currentIntakeId, setCurrentIntakeId] = useState(localStorage.getItem("currentIntakeId"));

  useEffect(() => {
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    } else if (permissionLevel === "projectlead") {
      setAdminNavbar(false);
    }

    getCurriculumByIntakeId(localStorage.getItem("currentIntakeId")).then((res) => {
      setCurriculumTitle(`Curriculum Development Plan: ${res.data.name}`)
    });

    getIntakeByIntakeId(localStorage.getItem("currentIntakeId")).then((res) => {
      setStatus(res.data.status);
    })

  });

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

  const [open, setOpen] = useState(false);


    // Handles Logging in
    function handleSubmit(e) {
        e.preventDefault();
       
    }

    // Handles Create New Account Submission
    const submitModal = (e) => {
      if (success == true){
       editIntakeStatusByIntakeId(currentIntakeId, "archived-success");
      }
      else{
        editIntakeStatusByIntakeId(currentIntakeId, "archived-fail");

      }
      e.preventDefault();
      setOpen(false);
      const permissionLevel = localStorage.getItem("permission-level")
      if (permissionLevel === "admin") {
        history("/admindashboard")
      }
      if (permissionLevel === "projectlead") {
        history("/pldashboard")
      }
      
    };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);


  function handleRadioButtons(e) {
    const name = e.target.name; // Radio1/Radio2
    const value = e.target.value; // Yes/No

    if (name === "radio1") {
        if (value === "yes") {
          setIsRadio1Visible(true);
          setSuccess(true);
        } else {
          setIsRadio1Visible(false);
        }
    }

    if (name === "radio2") {
      if (value === "yes") {
        setIsRadio2Visible(true);
        
      } else {
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

      <span className='p-5' style={{display: 'flex', justifyContent: 'center'}}>

        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>{curriculumTitle}</h1>
        {status.includes("archived") ? null :
                <OverlayTrigger delay={{hide: 150, show: 300}} overlay={(props) => {
                  return <Tooltip {...props}>Archive</Tooltip>
                }}>
                  <button style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '1%', paddingBottom: '1%'}}>
                    <img src={archive} alt='edit-icon' height='25px' onClick={handleOpenModal}/>
                  </button>
                </OverlayTrigger>

        }
      </span>
        
      </div>
      {/* Buttons */}
      <div className="col d-flex justify-content-center" style={{paddingTop: "0.5%"}}>
        <Container id='clientButtonContainer' fluid>

          {/* Card1: Intake Data */}
          <Card id='card1' className="text-center mx-auto" style={{background: '#0098C3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter' }}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                  <Button onClick={intakeData} variant='outline-light' size='lg' style={{minWidth: "350px", fontSize: "28px"}}>Intake Data</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card2: Needs Assessment */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#6E9A35', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                <Button onClick={needsAssessment} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Needs Assessment</Button>
              </Card.Title>
            </Card.Body>
          </Card>

          {/* Card3: Curriculum */}
          <Card id='card3' className="text-center mx-auto" style={{ background: '#d2492a', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                <Button onClick={viewCourse} variant='outline-light' size='lg' style={{width: "350px", fontSize: "28px"}}>Curriculum</Button>
              </Card.Title>
            </Card.Body>
          </Card>
        </Container>

        <div className="mb-3">
              <Modal show={open} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Archive Intakes</Modal.Title>
                </Modal.Header>
                  <Modal.Body>

                   <div>
                    <h4>Was this intake considered successful?</h4>
                   
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
}

export default CurriculumDash;