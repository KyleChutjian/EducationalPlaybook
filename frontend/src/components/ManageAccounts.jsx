import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import { getAccounts } from '../services/userService';
import { manageAccounts } from '../services/userService';
import { getCurrentUser } from '../services/authService';

function ManageAccounts() {
  const history = useNavigate();
    const [ users, setUsers ] = useState([]);
    const [ usersHtml, setUsersHtml ] = useState(null);

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
        setUsers(result.data);
        loadUsers(result.data);
      });
      
    }, []);

    const loadUsers = (users) => {
      if (users === [] && typeof(users)) {
        return <div></div>;
      }
      const tableItems = users.map((user,index) => {
        return (<tr key={index}>
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
                <th scope="col">Project Lead</th>
                <th scope="col">Admin</th>
              </tr>
            </thead>
            <tbody>
              {usersHtml}
            </tbody>
          </table>
          <button onClick={savePermsButton} type="button" className="btn btn-primary" style={{fontFamily: 'Bitter', borderColor: 'white', backgroundColor: '#6E9A35', width: '30%', marginLeft: '40%', marginRight: '40%'}}>Save</button>
        </div>
  )
}

export default ManageAccounts;