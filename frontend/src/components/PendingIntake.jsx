import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { Button } from 'react-bootstrap';
import { getIntakesByStatus} from '../services/intakeService';
import {Card} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { saveIntake, submitIntake, getIntakebyStatus, adminApproveIntake, programleadApproveIntake, editIntakeByIntakeId } from '../services/intakeService';

import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBTextArea,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function PendingIntakes() {

  const history = useNavigate();

  const toPendingIntake = () => {
    // Update the route
    let path = '/curriculumDash';
    history(path);
  };
  const toLogin = () => {
    // Update the route
    let path = '/login';
    history(path);
  };


  const [ adminNavbar, setAdminNavbar ] = useState(false);
  const [ currentIntakeId, setCurrentIntakeId] = useState(localStorage.getItem("currentIntakeId"));

  //Approved Intake Hooks
  const [pendingIntakes, setPendingIntakes] = useState("");



  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }


    // Get Intake using Status
    getIntakesByStatus("pending").then((pendingIntakes) => {
      console.log(pendingIntakes.data);
      console.log("Hello World");
      setPendingIntakes(pendingIntakes);
      loadIntakes(pendingIntakes);
    });
      
  }, [currentIntakeId]);

  const loadIntakes = (intakes) => {
    setPendingIntakes(
      intakes.map((pendingIntakes, index) => {
        return(
          <div className="container" key={pendingIntakes[0]}>
            <div className="row" style={{paddingTop: "1%"}}>
              <button onClick={reroute(index)}>${pendingIntakes[0]}</button>
            </div>
          </div>
        )
      }
    ))
  }

  const reroute = (index) => {
    localStorage.setItem("currentIntakeId", pendingIntakes[index]);
    history('/curriculum')
  }


  
  return(

    <div className="intake-wrapper">
        {/* Navbar */}
        <div>
        {adminNavbar ? <AdminNav/> : <ClientNav/>}
      </div>
      {/* Jumbotron */}
      <div className='p-5 text-center' style={{backgroundColor: '#d2492a'}}>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>Pending Intakes</h1>
      </div>

        <div className="intake-body container" style={{paddingTop: "1%"}}>
          {/* Intake 1 */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button onClick={toPendingIntake} variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}><u>Intake #001</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>
          
         

          {/* Intake 2 */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}><u>Intake #002</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>
          

          {/* Intake 3 */}
          <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}><u>Intake #003</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>

          <Card id='card2' className="text-center mx-auto" style={{ background: '#d2492a', width: '10rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button variant='outline-dark' size='sm' style={{width: "100px", fontSize: "15px"}}><u>See More</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>

          
        </div>
      </div>

    
     
)
}

export default PendingIntakes;