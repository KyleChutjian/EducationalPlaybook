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

function ManageAccounts() {

  
    return(
        <div>
            <h1>ManageAccounts Screen</h1>
        </div>
  )
}

export default ManageAccounts;