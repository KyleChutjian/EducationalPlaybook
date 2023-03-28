import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import { getCurrentUser } from '../services/authService';
import AdminNav from '../components/AdminNav';

import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function ManageAccounts() {

  //get each user from mongo as object? to turn into table items (below from admindash)
    // Gets the user's first name for the "Welcome, [Name]"
    // getUserByUserId(currentUser.id).then((res) => {
    //   setAdminFirstName(res.data.firstName);
    // });
  //find where variable for access level is
  //link bubble to variable, update with save button
  //start generic, get better after
    return(
        <div>
          <div>
            <AdminNav/>
          </div>

          <h1>ManageAccounts Screen</h1>
        </div>
  )
}

export default ManageAccounts;