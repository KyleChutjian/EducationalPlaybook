import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {Card} from 'react-bootstrap';
import ClientNav from '../components/ClientNav';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { loginUser } from '../services/authService';
//other service variables
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
//localStorage.setItem("currentIntakeId", <selected intake's intakeId>);
//later call: localStorage.getItem("currentIntakeId");

function NeedsAssessment() {
  //constants for needs assessment
  //const [<varName>,<setterMethod>] = useState(<initial state>);

  useEffect(() => {
    //get/set functions
    //get<thing>by<otherthingid> (<thing>.id).then((res) => {<setting function(s)>});
    
  }, []);

  //constant buttonClick functions/routes

  
  return(
    <div>Needs Assessment Screen</div>
  );
}

export default NeedsAssessment;