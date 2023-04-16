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
  const approvIntakeArray = [];
  const approvIntakeNameArray = [];


  const toApprovedIntake = () => {
    // Update the route
    let path = '/curriculumDash';
    history(path);
  };


  const [ adminNavbar, setAdminNavbar ] = useState(false);

  //Approved Intake Hooks
  const [approvedIntakes, setApprovedIntakes] = useState(null);


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
      //console.log(approvedIntakes.data);
      setApprovedIntakes(approvedIntakes);
      loadIntakes(approvedIntakes.data);
      for(var i = 0; i < approvedIntakes.data.length; i++){
        var current = approvedIntakes.data[i]._id;
        var currentName = approvedIntakes.data[i].name;

        if(approvIntakeArray.indexOf(current) < 0){
            console.log(approvIntakeArray.indexOf(current));
            console.log(current);
            approvIntakeArray.push(current);
            approvIntakeNameArray.push(currentName);
          }
      }

      console.log(approvIntakeArray);
      

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
                  localStorage.setItem("currentIntakeId", approvIntakeArray[index]);
                  toApprovedIntake();
                } } variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}>{approvIntakeNameArray[index]}<u>{}</u></Button>
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
          {approvedIntakes}       
        </div>
      </div>

      
       
  )
}

export default ApprovedIntakes;