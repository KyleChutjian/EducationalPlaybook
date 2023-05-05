import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { Button } from 'react-bootstrap';
import { getAllArchivedIntakes, getArchivedIntakesByClientId } from '../services/intakeService';
import {Card} from 'react-bootstrap';
import { getCurrentUser } from '../services/authService';

function ArchivedIntakes() {

  const history = useNavigate();

  const [ adminNavbar, setAdminNavbar ] = useState(false);

  const [archivedIntakes, setArchivedIntakes] = useState(null);
  const [archivedIntakesHTML, setArchivedIntakesHTML] = useState(null);

  useEffect(() => {
    loadIntakes(archivedIntakes)
  }, [archivedIntakes])

  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }

    if (permissionLevel === 'client') {
      getArchivedIntakesByClientId(getCurrentUser().id).then((intakes) => {
        setArchivedIntakes(intakes.data);
      })
    } else {
      getAllArchivedIntakes().then((intakes) => {
        setArchivedIntakes(intakes.data);
      });
    }


      
  }, []);

  const getIntakeBackgroundColor = (status) => {
    switch (status) {
      case "archived-success":
        return "#5cb85c";

      case "archived-fail":
      case "archived-denied":
        return "#d9534f";

      default:
        return "#D3D3D3";
    }
  }

  const loadIntakes = (intakes) => {
    if (intakes === null) {
      return null;
    }
    setArchivedIntakesHTML(
      intakes.map((intake, index) => {
        return(
          <div className="container" key={index}>
            <div className="row" style={{paddingTop: "1%"}}>


            <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
            <Card.Body>
              <Card.Title style={{fontSize:'30px'}}>
                <Button name={index} onClick={() =>{
                  localStorage.setItem("currentIntakeId", intake._id)
                  history("/curriculumDash");
                } } variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px", background: getIntakeBackgroundColor(intake.status)}}>{intake.name}<u>{}</u></Button>
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
          {archivedIntakesHTML}       
        </div>

    
    </div>
  )
}

export default ArchivedIntakes;