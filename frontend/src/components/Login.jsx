import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/authService';
import { createAccount } from '../services/userService';
import TextField from "@mui/material/TextField";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';


// import {
//   Async,
//   FieldFeedback,
//   FieldFeedbacks,
//   FormWithConstraints,
//   Input
// } from 'react-form-with-constraints-bootstrap';
// import { request } from 'express';
//import { DisplayFields } from 'react-form-with-constraints-tools';


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
       // e.preventDefault();
        loginUser(account).then(() => {
            // Update the route
            history("/clientDashboard");
             
        }).catch((err) => {
          console.log(err.response.status)
          if (err.response.status === 401) {
            alert("Invalid credentials. Please try again.")
          }
        });
        //console.log(request);
    }

    // Handles Create New Account Submission
    const submitModal = (e) => {
     // e.preventDefault();
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

      //Regex Expressions
      var emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      //var passwordConfirmRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      //Check validity 
      var emailValid = false;
      var passwordValid = false;
      var nameValid = false;
      //var passwordConfirmValid = false;


    //Validate Form 
    function validateForm(e) {
      e.preventDefault();
      //Validate Email
      const email = account.email;
      if(email === "" || email == null) {
          alert("Please enter an email.");
      } else {
          emailValid = true;
      }
  
      //Validate Password
      const password = account.password;
      if(password === "" || password == null) {
          alert("Please enter a password.");
      } else {
          passwordValid = true;
      }
  
      if(emailValid == true && passwordValid == true) {
        //window.location.href="curriculum.jsx";
          handleSubmit();
        
      }
  
    }


  //Validate New Account Form 
  function validateNewAccountForm(e) {
    e.preventDefault();
     //Validate Name 
     const firstName = newAccount.firstName;
     const lastName = newAccount.lastName;
     if(firstName === "" || lastName === "") {
        alert("Please fill out your first and last name.")
     } else {
        nameValid = true;
     }

     //Validate New Email
    const newEmail = newAccount.email;
    if(newEmail === "" || newEmail == null) {
        alert("Please enter an email.");
    } else if (emailRegEx.test(newEmail) == false) {
        alert("Invalid email. Please use follow the example template: (example@hhchealth.org)");
    } else if (!/^[^@\s]+@hhchealth.org$/i.test(newEmail)) {
        alert("Invalid email. Please enter your Hartford HealthCare email.")
    } else {
        emailValid = true;
    }


    //Validate New Password
    const newPassword = newAccount.password;
    if(newPassword === "" || newPassword == null) {
        alert("Please enter a password.");
    } else if(passwordRegEx.test(newPassword) == false) {
        alert("Invalid password. Please use Upper and Lowercase letters, numbers and at least one special character.");
    } else {
        passwordValid = true;
    }

    if(emailValid == true && passwordValid == true) {
      //window.location.href="curriculum.jsx";
        submitModal();
      
    }

  }

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
                id="accountEmail"
                type="email"
                style={{width:'50%', background:'white', marginBottom:'20px'}}
                label="yourname@hhchealth.org"
                name="email"
                value={account.email}
                onChange={handleChange}
                required/>
          </div>
          <div id="password" className="mb-3">
              <TextField
                style={{width:'50%', background:'white', marginBottom:'20px'}}
                id="accountPassword"
                label="Password"
                name="password"
                type="password"
                value={account.password}
                onChange={handleChange}
                required
              />
          </div>
          <div className="mb-3">
              <Modal show={open} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                  <Modal.Body>

                    <Form id="createAccountForm" className="needs-validation">
                      <div className="form-group">
                        <label htmlFor="firstNameLabel">First Name</label>
                        <input required type="text" className="form-control" id="inputFirstName" name="firstName" placeholder="Enter First Name" onChange={handleModalChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastNameLabel">Last Name</label>
                        <input required type="text" className="form-control" id="inputLastName" name="lastName" placeholder="Enter Last Name" onChange={handleModalChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="emailLabel">Email</label>
                        <input required type="email" className="form-control" id="inputEmail" name="email" placeholder="Enter Email" onChange={handleModalChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input required type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={handleModalChange}/>
                          {/* <FieldFeedbacks for="password">
                            <FieldFeedback when="valueMissing" />
                            <FieldFeedback when="patternMismatch">Should be at least 5 characters long</FieldFeedback>
                            <FieldFeedback when={value => !/\d/.test(value)} warning>
                              Should contain numbers
                            </FieldFeedback>
                            <FieldFeedback when={value => !/[a-z]/.test(value)} warning>
                              Should contain small letters
                            </FieldFeedback>
                            <FieldFeedback when={value => !/[A-Z]/.test(value)} warning>
                              Should contain capital letters
                            </FieldFeedback>
                            <FieldFeedback when={value => !/\W/.test(value)} warning>
                              Should contain special characters
                            </FieldFeedback>
                            <FieldFeedback when="valid">Looks good!</FieldFeedback>
                        </FieldFeedbacks> */}
                      </div>
                    </Form>
                      
                    
                  </Modal.Body>
                  

                  <Modal.Footer>
                    <Button style={{background:'#6E9A35'}} onClick={validateNewAccountForm}>Submit</Button>
                    {/* <Button variant="secondary" onClick={handleCloseModal}>Close</Button> */}
                  </Modal.Footer>

              </Modal>
          </div>
          <div className="login-button" style={{paddingBottom: "0.3%"}}>
            <button type="submit" onClick={validateForm} className="btn btn-success" style={{width:'50%',fontFamily: 'Bitter', background:'#d2492a'}}>Login</button>
          </div>
          <div className="create-account-button">
            <Button variant="primary" onClick={handleOpenModal} style={{width:'50%',fontFamily: 'Bitter', background: '#a40084'}}>Create New Account</Button>
          </div>
          
          
      </div>
    </div>
  )
}

export default Login;