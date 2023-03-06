import React, { useState } from 'react'
import { Form, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import { createAccount } from '../services/userService';
import TextField from "@mui/material/TextField";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';

import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import ClientNav from './ClientNav';


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
            history("/clientDashboard");
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

    useEffect(() => { document.body.style.backgroundColor = '#66c1db' }, [])

    // Login screen HTML
    return(
      
      <div style={{height:'100%'}} className="" id="loginScreen">
        <div className="container text-center">
          <h1> <img src="./EP logo 2.png" alt="bug" height={270} style={{marginTop:'40px' , marginBottom:'20px'}}/> </h1>
        </div>
 
        {/* <form id="loginForm" className='text-center' onSubmit={handleSubmit}> */}
        <div id="loginForm" className='form-container text-center' style={{ height:'100%', opacity:'90%'}}>
          <div style={{paddingBottom: "0.5%"}}>
              <TextField 
                style={{width:'50%', background:'white'}}
                label="yourname@hhchealth.org"
                name="email"
                value={account.email}
                onChange={handleChange}
              />
          </div>
          <div id="password" className="mb-3">
              <TextField
                style={{width:'50%', background:'white'}}
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
                    <Button style={{background:'#6E9A35'}} onClick={submitModal}>Submit</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  </Modal.Footer>

              </Modal>
          </div>
          <div className="login-button" style={{paddingBottom: "0.3%"}}>
            <button type="submit" onClick={handleSubmit} className="btn btn-success" style={{width:'50%',fontFamily: 'Bitter', background:'#d2492a'}}>Login</button>
          </div>
          <div className="create-account-button">
            <Button variant="primary" onClick={handleOpenModal} style={{width:'50%',fontFamily: 'Bitter', background: '#a40084'}}>Create New Account</Button>
          </div>
          
          
      </div>
    </div>
  )
}

export default Login;