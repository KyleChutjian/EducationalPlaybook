import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { getIntakesByStatus} from '../services/intakeService';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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

function ApprovedIntakes() {


  const history = useNavigate();
  const intakeArray = new Array();

  const toApprovedIntake = () => {
    // Update the route
    let path = '/curriculumDash';
    history(path);
  };


  

  const toLogin = () => {
    // Update the route
    let path1 = '/login';
    history(path1);
  };







  const [ adminNavbar, setAdminNavbar ] = useState(false);
  const [ currentIntakeId, setCurrentIntakeId] = useState(localStorage.getItem("currentIntakeId"));

  //Approved Intake Hooks
  const [approvedIntakes, setApprovedIntakes] = useState(null);



  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }


    // Get Intake using Status
    getIntakesByStatus("approved").then((approvedIntakes) => {
      //console.log(approvedIntakes.data);
      setApprovedIntakes(approvedIntakes);
      loadIntakes(approvedIntakes.data);
      for(var i = 0; i < approvedIntakes.data.length; i++){

        if(intakeArray.length == 0){
          intakeArray.push(approvedIntakes.data[i]._id);
          console.log(intakeArray.indexOf(i));
          console.log(intakeArray[i]);
        }
        else{
          if(intakeArray.indexOf(i) == -1){
            console.log(intakeArray.indexOf(i));
            console.log(intakeArray[i]);
            intakeArray.push(approvedIntakes.data[i]._id);
          }
        }
        

      }

      console.log(intakeArray);
      

    });
      
  }, []);

 
  const loadIntakes = (intakes) => {
    setApprovedIntakes(
      intakes.map((approvedIntakes, index) => {
        return(
          <div className="container" key={index}>
            <div className="row" style={{paddingTop: "1%"}}>


            <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button name={index} onClick={() =>{
                  localStorage.setItem("currentIntakeId", intakeArray[index]);
                  history('/curriculumDash');

                } } variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}><u>{`Approved Intake ${index}`}</u></Button>
              </Card.Title>
            </Card.Body>
          </Card>

            </div>
          </div>
        )
       
      }

    
    ))
    

  }

  const reroute = (e) => {
    const index = e.target.name;

    //console.log(approvedIntakes);
    //console.log(approvedIntakes == null);
   

   
    if(approvedIntakes != null){
      console.log(approvedIntakes);
      //localStorage.setItem("currentIntakeId", approvedIntakes[index]._id);
      //console.log(index);
      console.log(approvedIntakes[index]._id);
      //history('/curriculumDash');

    }
   
    
  }




  


 
  
  
  
  
  

  

  
    return(

      <div className="intake-wrapper">
        {/* Navbar */}
        <div>
        {adminNavbar ? <AdminNav/> : <ClientNav/>}
      </div>
      {/* Jumbotron */}
      <div className='p-5 text-center' style={{backgroundColor: '#6E9A35'}}>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>Approved Intakes</h1>
      </div>

        <div className="intake-body container" style={{paddingTop: "1%"}}>
          {approvedIntakes}       
        </div>
      </div>

      
       
  )
}

export default ApprovedIntakes;