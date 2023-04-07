import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import { getCurrentUser } from '../services/authService';
import AdminNav from '../components/AdminNav';
import { getAccounts } from '../services/userService';
import { manageAccounts } from '../services/userService';

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

    //getUsers instead of getAccounts? (new method in userservice)
    //getuserby something when checkbox clicked to update status (or foreach on save?)
    //

    //get all current accounts
    const users = getAccounts();

    useEffect(() => {
      const tableItems = "";

      for (let i = 0; i < users.length; i++) {
        //format table item for each user using info
        //341 ls15 video1 5 minutes in
      }

    }, [])

    const savePermsButton = () => {
      //update permissions for each user
      //call ManageAccounts (once for each role, 'output' is T/F)
    };
  
    const onChangeUser = (e) => {
      const {name, value, checked} = e.target; //e.target.<attribute> for stuff

    }

    return(
        <div>
          <div>
            <AdminNav/>
          </div>

          <h1 className='mb-3' style={{margin: '50px', textAlign: 'center', fontFamily: 'Bitter'}}>Manage Accounts</h1>

          <table className="table" style={{width: '70%', marginLeft: '15%', marginRight: '15%'}}>
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Employee</th>
                <th scope="col">Program Lead</th>
                <th scope="col">Admin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">thomas.nowicki@hhchealth.org</th>
                <td>Nowicki, Tom</td>
                <td>
                  <input className="form-check-input" type="checkbox" value="" id="checkProgram" />
                </td>
                <td><input className="form-check-input" type="checkbox" value="" id="checkAdmin" defaultChecked={true} onChange={onChangeUser}/></td>
             </tr>
    
            </tbody>
          </table>
          <button onClick="savePermsButton" type="button" class="btn btn-primary" style={{fontFamily: 'Bitter', borderColor: 'white', backgroundColor: '#6E9A35', maxWidth: '200px', width: '30%', marginLeft: '40%', marginRight: '40%'}}>Save</button>
        </div>
  )
}
//something to indicate where table items (accounts) get inserted

export default ManageAccounts;