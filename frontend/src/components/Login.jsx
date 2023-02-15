import React, { useState } from 'react'
import { Form, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import { createAccount } from '../services/userService';
import TextField from "@mui/material/TextField";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

// import { Modal } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Login() {
    const history = useNavigate();

    const [account, setAccount] = useState({
        email: "",
        password: ""
    });

    const [newAccount, setNewAccount] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });

    // Modal open hook
    const [open, setOpen] = useState(false);


    // Handles Logging in
    function handleSubmit(e) {
        e.preventDefault();
        loginUser(account).then(() => {
            // Update the route
            history("/dashboard");
        }).catch((err) => console.log(err));
    }

    // Handles Create New Account Submission
    const submitModal = (e) => {
      e.preventDefault();
      setOpen(false);
      console.log(newAccount);

      createAccount(newAccount).then((res) => {
        console.log(res);
      }).catch((err) => console.log(err));
    };

    // Updates Account Logging in
    function handleChange(e) {
      const { name, value } = e.target;

      setAccount((old) => {
        return {
          ...old,
          [name]: value,
        };
      });
    }

    // Updates New Account Being Created
    function handleModalChange(e) {
      const { name, value } = e.target;
      setNewAccount((old) => {
        return {
          ...old,
          [name]: value,
        };
      });
    }

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);



    // Login screen HTML
    return(
      <div className="" id="loginScreen">
      <div id="j-tron" className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">Login</h1>
        </div>
      </div>
        {/* <form id="loginForm" className='text-center' onSubmit={handleSubmit}> */}
        <div id="loginForm" className='form-container text-center'>
          <div style={{paddingBottom: "0.5%"}}>
              <TextField
                label="Email"
                name="email"
                value={account.email}
                onChange={handleChange}
              />
          </div>
          <div id="password" className="mb-3">
              <TextField
                label="Password"
                name="password"
                type="password"
                value={account.password}
                onChange={handleChange}
              />
          </div>
          <div className="mb-3">
              <Modal show={open} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                  <Modal.Body>

                    <form id="createAccountForm">
                      <div className="form-group">
                        <label htmlFor="firstNameLabel">First Name</label>
                        <input type="text" className="form-control" id="inputFirstName" name="firstName" placeholder="Jane" onChange={handleModalChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastNameLabel">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" name="lastName" placeholder="Doe" onChange={handleModalChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="emailLabel">Email</label>
                        <input type="email" className="form-control" id="inputEmail" name="email" placeholder="Enter Email" onChange={handleModalChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="passwordLabel">Password</label>
                        <input type="password" className="form-control" id="inputPassword" name="password" placeholder="Enter Password" onChange={handleModalChange}/>
                      </div>
                    </form>
                      
                    
                  </Modal.Body>
                  

                  <Modal.Footer>
                    <Button variant="primary" onClick={submitModal}>Submit</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  </Modal.Footer>

              </Modal>
          </div>
          <div className="login-button" style={{paddingBottom: "0.3%"}}>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Login</button>
          </div>
          <div className="create-account-button">
            <Button variant="secondary" onClick={handleOpenModal}>Create New Account</Button>
          </div>
          
          
      </div>
    </div>
  )
}

export default Login;