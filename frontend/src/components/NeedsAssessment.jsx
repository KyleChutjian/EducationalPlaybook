import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function NeedsAssessment() {

  
    return(
        <div>
            <h1>NeedsAssessment Screen</h1>
        </div>
  )
}

export default NeedsAssessment;