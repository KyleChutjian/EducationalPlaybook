import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { Button } from 'react-bootstrap';
import { getIntakesByStatus} from '../services/intakeService';
import {Card} from 'react-bootstrap';

function ArchivedIntakes() {

  const history = useNavigate();

  const archIntakeArray = new Array();
  const archIntakeNameArray = new Array();

  const toArchivedIntake = () => {
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
  const [archivedIntakes, setArchivedIntakes] = useState(null);



  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }


    // Get Intake using Status
    getIntakesByStatus("archived").then((archivedIntakes) => {
      console.log(archivedIntakes.data);
      console.log("Hello World");
      setArchivedIntakes(archivedIntakes);
      loadIntakes(archivedIntakes.data);

      for(var i = 0; i < archivedIntakes.data.length; i++){
        var current = archivedIntakes.data[i]._id;
        var currentName = archivedIntakes.data[i].name;

        if(archIntakeArray.indexOf(current) < 0){
            console.log(archIntakeArray.indexOf(current));
            console.log(current);
            archIntakeArray.push(current);
            archIntakeNameArray.push(currentName);
          }
      }

      console.log(archIntakeArray);
    });
      
  }, []);

  const loadIntakes = (intakes) => {
    setArchivedIntakes(
      intakes.map((archivedIntakes, index) => {
        return(
          <div className="container" key={index}>
            <div className="row" style={{paddingTop: "1%"}}>


            <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
                <Button name={index} onClick={() =>{
                  localStorage.setItem("currentIntakeId", archIntakeArray[index]);
                  toArchivedIntake();
                } } variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}>{archIntakeNameArray[index]}<u>{}</u></Button>
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
      <div className='p-5 text-center' style={{backgroundColor: '#d2492a', color:'whitesmoke'}}>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>Archived Intakes</h1>
      </div>

      <div className="intake-body container" style={{paddingTop: "1%"}}>
          {archivedIntakes}       
        </div>

    
    </div>

    
     
)
}

export default ArchivedIntakes;