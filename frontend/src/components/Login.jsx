import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../services/authService';
import { createAccount } from '../services/userService';
import TextField from "@mui/material/TextField";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';


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

      //Regex Expressions
  var emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  var passwordConfirmRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  //Check validity 
  var emailValid = false;
  var passwordValid = false;
  var passwordConfirmValid = false;

  //Validate Form 
  function validateForm() {

    //Validate Email
    const email = document.getElementById("email");
    if(email === "" || email == null) {
        alert("Please enter an email.");
    } else if (emailRegEx.test(email) == false) {
        alert("Invalid email. Please use follow the example template: (example@quinnipiac/qu.edu)");
    } else if (!/^[^@\s]+@quinnipiac.edu$/i.test(email) && !/^[^@\s]+@qu.edu$/i.test(email)) {
        alert("Invalid email. Please enter your Quinnipiac email.")
    } else {
        emailValid = true;
    }

  }

//     const txtFieldState = {
//       value: "",
//       valid: true,
//       typeMismatch: false,
//       errMsg: "" //this is where our error message gets across
//   };

//   state = {
//     email: { ...txtFieldState, fieldName: "Email", required: true, requiredTxt: "Email is required", formatErrorTxt: "Incorrect email format" },
//     firstname: { ...txtFieldState, fieldName: "First Name", required: true, requiredTxt: "First Name is required" },
//     lastname: { ...txtFieldState, fieldName: "Last Name", required: false, requiredTxt: "Last Name is required" },
//     allFieldsValid: false
// };

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
                type="email"
                style={{width:'50%', background:'white', marginBottom:'20px'}}
                label="yourname@hhchealth.org"
                name="email"
                value={account.email}
                onChange={handleChange}
                required
              />
          </div>
          <div id="password" className="mb-3">
              <TextField
                style={{width:'50%', background:'white', marginBottom:'20px'}}
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

                    <Form id="createAccountForm">
                      <div className="form-group">
                        <label htmlFor="firstNameLabel">First Name</label>
                        <input type="text" className="form-control" id="inputFirstName" name="firstName" placeholder="Enter First Name" onChange={handleModalChange} required/>
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
                        <label htmlFor="passwordLabel">Password</label>
                        <input required type="password" className="form-control" id="inputPassword" name="password" placeholder="Enter Password" onChange={handleModalChange}/>
                      </div>
                    </Form>
                      
                    
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