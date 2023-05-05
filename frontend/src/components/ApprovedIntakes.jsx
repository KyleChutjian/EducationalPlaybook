import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { getIntakesByStatus} from '../services/intakeService';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getCurrentUser } from '../services/authService';

function ApprovedIntakes() {

  const history = useNavigate();

  const [ adminNavbar, setAdminNavbar ] = useState(false);

  //Approved Intake Hooks
  const [approvedIntakes, setApprovedIntakes] = useState(null);
  const [approvedIntakesHTML, setApprovedIntakesHTML] = useState(null);

  useEffect(() => {
    loadIntakes(approvedIntakes);
  }, [approvedIntakes])

  useEffect(() => {
    const currentUser = getCurrentUser();
    const permissionLevel = localStorage.getItem("permission-level");
    if (!currentUser.isAdmin || !currentUser.isProjectLead) {
      history("/clientdashboard");
    }
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }
    // Get Intake using Status
    getIntakesByStatus("approved").then((approvedIntakes) => {
      setApprovedIntakes(approvedIntakes.data);
    });
      
  }, []);

  const loadIntakes = (intakes) => {
    if (intakes === null) {
      return null;
    }
    setApprovedIntakesHTML(
      intakes.map((intake, index) => {
        return(
          <div className="container" key={index}>
            <div className="row" style={{paddingTop: "1%"}}>
              <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
                <Card.Body>
                  <Card.Title style={{fontSize:'30px'}}>
                    <Button name={index} onClick={() =>{
                      localStorage.setItem("currentIntakeId", intake._id);
                      history('/curriculumDash');
                    } } variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}>{intake.name}</Button>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          </div>
        )
      }
    ))
  }
    return(

      <div className="intake-wrapper">
        {/* Navbar */}
        <div>
        {adminNavbar ? <AdminNav/> : <ClientNav/>}
      </div>
      {/* Jumbotron */}
      <div className='p-5 text-center' style={{backgroundColor: '#6E9A35'}}>
        <h1 className='mb-3' style={{fontFamily: 'Bitter', color:'whitesmoke'}}>Approved Intakes</h1>
      </div>

        <div className="intake-body container" style={{paddingTop: "1%"}}>
          {approvedIntakesHTML}       
        </div>
      </div>
  )
}

export default ApprovedIntakes;