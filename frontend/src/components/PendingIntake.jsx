import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { Button } from 'react-bootstrap';
import { getIntakesByStatus, getIntakesByProjectLeadIdByStatus } from '../services/intakeService';
import { getAccountsByRole } from '../services/userService';
import {Card} from 'react-bootstrap';


function PendingIntakes() {

  const history = useNavigate();

  const pendIntakeArray = new Array();
  const pendIntakeNameArray = new Array();

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

  // Returns an array of intake objects
  getIntakesByProjectLeadIdByStatus("63ec25944c32561072ec88db", "pending-projectlead").then((result) => {
    console.log(result.data);
  })

  // Returns an array of user objects
  getAccountsByRole("PROJECTLEAD").then((result) => {
    console.log(result.data);
  })

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
    getIntakesByStatus("pending-admin" || "pending-client" || "pending-projectlead").then((pendingIntakes) => {
      console.log(pendingIntakes.data);
      setPendingIntakes(pendingIntakes);
      loadIntakes(pendingIntakes.data);


      for(var i = 0; i < pendingIntakes.data.length; i++){
        var current = pendingIntakes.data[i]._id;
        var currentName = pendingIntakes.data[i].name;

        if(pendIntakeArray.indexOf(current) < 0){
            console.log(pendIntakeArray.indexOf(current));
            console.log(current);
            pendIntakeArray.push(current);
            pendIntakeNameArray.push(currentName);
          }
      }

      console.log(pendIntakeArray);
    });
      
  }, []);

  const loadIntakes = (intakes) => {
    setPendingIntakes(
      intakes.map((pendingIntakes, index) => {
        return(
          <div className="container" key={index}>
            <div className="row" style={{paddingTop: "1%"}}>


            <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button name={index} onClick={() =>{
                  localStorage.setItem("currentIntakeId", pendIntakeArray[index]);
                  toPendingIntake();
                } } variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}>{pendIntakeNameArray[index]}</Button>
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