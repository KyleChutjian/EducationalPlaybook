import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import { getAccounts } from '../services/userService';
import { manageAccounts, changePassword, deleteUserByUserId } from '../services/userService';
import { getCurrentUser } from '../services/authService';
import editIcon from '../resources/edit-icon.png';
import deleteIcon from '../resources/delete-icon.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ManageAccounts() {
  const history = useNavigate();
    const [ users, setUsers ] = useState([]);
    const [ usersHtml, setUsersHtml ] = useState(null);
    const [ currentUserIndex, setCurrentUserIndex ] = useState(null);
    const [ currentUserPassword, setCurrentUserPassword ] = useState(null);
    const [ currentUserConfirmPassword, setCurrentUserConfirmPassword ] = useState(null);
    
    const [ editUserHTML, setEditUserHTML ] = useState(<div></div>);
    const [ openEditModal, setOpenEditModal ] = useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    useEffect(() => {
      loadUsers(users);
    }, [users]);

    useEffect(() => {
      if (currentUserIndex === null) {
        setEditUserHTML(<div></div>)
      } else {
        setEditUserHTML(<div>
          Email: {users[currentUserIndex].email}
          <div>
            <label>New Password:</label>
          </div>
          <div>
            <input type='password' name='password' onChange={handleChangePassword}></input>
          </div>

          <div>
            <label>Confirm New Password:</label>
          </div>

          <div>
            <input type='password' name='confirm' onChange={handleChangePassword}></input>
          </div>

  
  
        </div>)
      }

    }, [currentUserIndex])

    useEffect(() => {
      const currentUser = getCurrentUser();
      const permissionLevel = localStorage.getItem("permission-level");
      if (!currentUser.isAdmin) {
        if (permissionLevel === "projectlead") {
          history("/pldashboard");
        } else if (permissionLevel === "client") {
          history("/clientdashboard");
        }
      }

      getAccounts().then((result) => {
        result.data.forEach((user) => {
          user.isDeleted = false;
        })
        setUsers(result.data);
      });
      
    }, []);

    const loadUsers = (users) => {
      if (users === [] && typeof(users)) {
        return <div></div>;
      }
      const tableItems = users.map((user,index) => {
        // If user is deleted, add a strike-through to visually show it has been temporarily deleted
        if (user.isDeleted) {
          return(
          <tr key={index} style={{textDecorationLine: 'line-through'}}>
            <td>{user.email}</td>
            <td>{user.lastName}, {user.firstName}</td>
            <td><input className="form-check-input" type="checkbox" name={`projectLead${index}`} value="" id="checkProjectLead" defaultChecked={user.isProjectLead} onChange={onChangeUser}/></td>
              {getCurrentUser().email === 'thomas.nowicki@hhchealth.org' || !user.isAdmin ?
                <td><input className="form-check-input" type="checkbox" name={`admin${index}`} value="" id="checkAdmin" defaultChecked={user.isAdmin} onChange={onChangeUser}/></td>
                :
                <td><input className="form-check-input" type="checkbox" name={`admin${index}`} value="" id="checkAdmin" disabled defaultChecked={user.isAdmin} onChange={onChangeUser}/></td>
              }

            <td>
              <button style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '1%', paddingBottom: '0%'}}>
                <img src={editIcon} alt='edit-icon' name={index} height='15px' onClick={onEditUser}/>
              </button>
              <button style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '10%', paddingBottom: '0%'}}>
                <img src={deleteIcon} alt='delete-icon' name={index} height='15px' onClick={onDeleteUser}/>
              </button>
            </td>
          </tr>
          )
        } else {
          return(
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.lastName}, {user.firstName}</td>
              <td><input className="form-check-input" type="checkbox" name={`projectLead${index}`} value="" id="checkProjectLead" defaultChecked={user.isProjectLead} onChange={onChangeUser}/></td>
              {getCurrentUser().email === 'thomas.nowicki@hhchealth.org' || !user.isAdmin ?
                <td><input className="form-check-input" type="checkbox" name={`admin${index}`} value="" id="checkAdmin" defaultChecked={user.isAdmin} onChange={onChangeUser}/></td>
                :
                <td><input className="form-check-input" type="checkbox" name={`admin${index}`} value="" id="checkAdmin" disabled defaultChecked={user.isAdmin} onChange={onChangeUser}/></td>
              }
              {getCurrentUser().email === 'thomas.nowicki@hhchealth.org' || !user.isAdmin ?
                <td>
                  <button style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '1%', paddingBottom: '0%'}}>
                    <img src={editIcon} name={index} onClick={onEditUser} alt='edit-icon' height='15px' />
                  </button>
                  <button style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '10%', paddingBottom: '0%'}}>
                    <img src={deleteIcon} name={index} onClick={onDeleteUser} alt='delete-icon' height='15px' />
                  </button>
                </td>
                :
                <td>
                  <button disabled style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '1%', paddingBottom: '0%'}}>
                    <img src={editIcon} disabled alt='edit-icon' name={index} height='15px' onClick={onEditUser}/>
                  </button>
                  <button disabled style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '10%', paddingBottom: '0%'}}>
                    <img src={deleteIcon} alt='delete-icon' name={index} height='15px' onClick={onDeleteUser}/>
                  </button>
                </td>
                
              }
            </tr>
            )
        }
      });
      setUsersHtml(tableItems);
    }
    const handleChangePassword = (e) => {
      const { name, value } = e.target;
      if (name === 'password') {
        setCurrentUserPassword(value);
      }
      if (name === 'confirm') {
        setCurrentUserConfirmPassword(value);
      }
      
    }

    const onEditUser = (e) => {
      const name = e.target.name;
      const index = parseInt(name);
      console.log(users[index]);
      setCurrentUserIndex(index);
      
      if (getCurrentUser().email === 'thomas.nowicki@hhchealth.org' || !users[index].isAdmin) {
        handleOpenEditModal();
      }

    }
    const handleEditUserSubmit = (e) => {
      if (currentUserPassword.length < 7) {
        alert('Password is not at least 7 characters, try again')
      } else if (currentUserPassword === currentUserConfirmPassword) {
        users[currentUserIndex].newPassword = currentUserPassword;


        changePassword({
          password: currentUserPassword,
          userId: users[currentUserIndex]._id
        }).then((result) => {
          if (result.status === 200) {
            alert(`Successfully changed password with email: ${users[currentUserIndex].email}`);
          } else {
            alert(`Error: something went wrong`);
          }
          
        })
        handleCloseEditModal();
      } else {
        alert('Passwords do not match, try again');
        console.log(currentUserPassword);
        console.log(currentUserConfirmPassword)
      }

    }
    const onDeleteUser = (e) => {
      console.log(users)
      const name = e.target.name;
      const index = parseInt(name);
      console.log(name)
      console.log(users[index]);
      if (getCurrentUser().email === 'thomas.nowicki@hhchealth.org' || !users[index].isAdmin) {
        setUsers((oldUsers) => {
          oldUsers[index].isDeleted = true;
          loadUsers(oldUsers);
          return oldUsers;
        })
      }

    }

    const savePermsButton = () => {
      console.log(users);
      users.forEach((user) => {
        // Check if user got deleted
        if (user.isDeleted) {
          console.log(`Deleting user with email: ${user.email}`);
          deleteUserByUserId(user._id);
          
        } else {
          manageAccounts(user._id,"projectLead",user.isProjectLead);
          manageAccounts(user._id,"admin",user.isAdmin);
        }



        // Update user's project-lead and admin permissions

      })
      history("/admindashboard");
    };
  
    const onChangeUser = (e) => {
      const {name, checked} = e.target; //e.target.<attribute> for stuf

      var indexString, index;
      if (name.includes("projectLead")) {
        indexString = name.split("projectLead")[1];
        index = parseInt(indexString);
        setUsers((oldUsers) => {
          oldUsers[index].isProjectLead = checked;
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
                <th scope="col">Project-Lead</th>
                <th scope="col">Admin</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersHtml}
            </tbody>
          </table>
          <div className="text-center">
            <button onClick={savePermsButton} type="button" className="btn btn-primary" style={{fontFamily: 'Bitter', borderColor: 'white', backgroundColor: '#6E9A35', width: '10%'}}>Save</button>
   
          </div>
       
          
          <Modal show={openEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editUserHTML}

            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleEditUserSubmit}>Save New Password</Button>
              <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
            </Modal.Footer>
          </Modal>

        </div>
  )
}

export default ManageAccounts;