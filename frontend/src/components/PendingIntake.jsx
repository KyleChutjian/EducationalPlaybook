import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { Button } from 'react-bootstrap';
import { getIntakesByPermissionByStatus } from '../services/intakeService';
import {Card} from 'react-bootstrap';
import { getCurrentUser } from '../services/authService';


function PendingIntakes() {

  const history = useNavigate();

  const [ adminNavbar, setAdminNavbar ] = useState(false);
  const [ pendingIntakes, setPendingIntakes] = useState("");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser.isAdmin || !currentUser.isProjectLead) {
      history("/clientdashboard");
    }
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }

    getIntakesByPermissionByStatus(permissionLevel, getCurrentUser().id).then((result) => {
      const pendingArray = result.data.map((intake) => {
        return {
          name: intake.name,
          intakeId: intake._id
        }
      });
      if (pendingArray.length > 0) {
        loadIntakes(pendingArray);
      }
      
    })
      
  }, []);

  const loadIntakes = (intakes) => {
    setPendingIntakes(
      intakes.map((intake, index) => {
        return(
          <div className="container" key={index}>
            <div className="row" style={{paddingTop: "1%"}}>


            <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                <Button name={intake.name} onClick={() =>{
                  localStorage.setItem("currentIntakeId", intake.intakeId);
                  history("/viewintake")
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
      <div className='p-5 text-center' style={{backgroundColor: '#0098C3'}}>
        <h1 className='mb-3' style={{fontFamily: 'Bitter', color:'whitesmoke'}}>Pending Intakes</h1>
      </div>

      <div className="intake-body container" style={{paddingTop: "1%"}}>
          {pendingIntakes}       
        </div>

    
    </div>

    
     
)
}

export default PendingIntakes;