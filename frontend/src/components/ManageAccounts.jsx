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

     //getUsers instead of getAccounts? (new method in userservice)
    //getuserby something when checkbox clicked to update status (or foreach on save?)
    //

    //get all current accounts
    //const users = getAccounts(); //make into useState
    const [ users, setUsers ] = useState([]);
    const [ usersHtml, setUsersHtml ] = useState(<div></div>);

    useEffect(() => {
      //loadUsers(users);
    }, [users]);

    useEffect(() => {
      getAccounts().then((result) => {
        setUsers(result.data);
        loadUsers(result.data);
      });
      
    }, []);

    const loadUsers = (users) => {
      if (users == [] && typeof(users)) {
        return <div></div>;
      }
      console.log(users);
      const tableItems = users.map((user,index) => {
        return (<tr>
          <td>{user.email}</td>
          <td>{user.lastName}, {user.firstName}</td>
          <td><input className="form-check-input" type="checkbox" name={`projectLead${index}`} value="" id="checkProjectLead" defaultChecked={user.isProjectLead} onChange={onChangeUser}/></td>
          <td><input className="form-check-input" type="checkbox" name={`admin${index}`} value="" id="checkAdmin" defaultChecked={user.isAdmin} onChange={onChangeUser}/></td>
        </tr> )
      });
      setUsersHtml(tableItems);
    }

    const savePermsButton = () => {
      console.log(users);
      users.forEach((user) => {
        manageAccounts(user._id,"projectLead",user.isProjectLead);
        manageAccounts(user._id,"admin",user.isAdmin);
      })      
    };
  
    const onChangeUser = (e) => {
      const {name, value, checked} = e.target; //e.target.<attribute> for stuf
      console.log(value, checked);
      //get type of checkbox
      //get userid/index
      var indexString, index;
      if (name.includes("projectLead")) {
        indexString = name.split("projectLead")[1];
        index = parseInt(indexString);
        setUsers((oldUsers) => {
          console.log(oldUsers[index].isProjectLead);
          oldUsers[index].isProjectLead = checked;
          console.log(oldUsers[index].isProjectLead);
          return oldUsers;
        })
      }
      if (name.includes("admin")) {
        indexString = name.split("admin")[1];
        index = parseInt(indexString);
        setUsers((oldUsers) => {
          oldUsers[index].isAdmin = checked;
          return oldUsers;
        })
      }
      

    // console.log(`name: ${name}`);
    // console.log(`value: ${value}`);
    // let indexString, index;
    // setCurriciulumLearningObjectives((oldObjectives) => {
    //   indexString = name.split("objective")[1];
    //   index = parseInt(indexString);
    //   oldObjectives[index] = value;
    //   return oldObjectives;
    // });
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
                <th scope="col">Project Lead</th>
                <th scope="col">Admin</th>
              </tr>
            </thead>
            <tbody>
              {usersHtml}
              {/* <tr>
                <td scope="row">thomas.nowicki@hhchealth.org</td>
                <td>Nowicki, Tom</td>
                <td>
                  <input className="form-check-input" type="checkbox" value="" id="checkProgram" />
                </td>
                <td><input className="form-check-input" type="checkbox" value="" id="checkAdmin" defaultChecked={true} onChange={onChangeUser}/></td>
             </tr> */}
            </tbody>
          </table>
          <button onClick={savePermsButton} type="button" class="btn btn-primary" style={{fontFamily: 'Bitter', borderColor: 'white', backgroundColor: '#6E9A35', width: '30%', marginLeft: '40%', marginRight: '40%'}}>Save</button>
        </div>
  )
}
//something to indicate where table items (accounts) get inserted

export default ManageAccounts;