import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { saveIntake, submitIntake, getIntakebyStatus, adminApproveIntake, programleadApproveIntake, editIntakeByIntakeId } from '../services/intakeService';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBTextArea,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function ApprovedIntakes() {


  const history = useNavigate();

  const toApprovedIntake = () => {
    // Update the route
    let path = '/intake';
    history(path);
  };

  const toLogin = () => {
    // Update the route
    let path = '/login';
    history(path);
  };

  


  // function ApprovedIntake() {
  //   // const clientId = useRef(0);
  //   // const [intakeId, setIntakeId] = useState();  
  
  //   const [account, setAccount] = useState({
  //     email: "",
  //     password: "",
  //     isProgramLead: true,
  //     isAdmin: true
  //   });

  //   const approvedIntakesJSON = localStorage.getItem("approvedIntakes");
  //   var approvedIntakes;
  //   if (approvedIntakesJSON === "null") {
  //     approvedIntakes = ["","","","","",""];
  //   } else {
  //   approvedIntakes = JSON.parse(localStorage.getItem("approvedIntakes"));
  //   }
  
  
    
  
  //   // useEffect(() => {
  //   //   console.log("page loaded");
  //   // }, []);
  
  
  
  //   function handleIntakeResponseChange(e) {
  //     const { name, value } = e.target;
  
  //     setIntakeData((old) => {
  //       // Get Queston number index
  //       const indexString = name.split("question")[1];
  //       const index = parseInt(indexString) - 1;
  
  //       // Redefine updated response
  //       old.intakeResponse[index] = value;
  
  //       // New object for return
  //       const newValues = {
  //         intakeId: old.intakeId,
  //         clientId: old.clientId,
  //         intakeResponse: old.intakeResponse
  //       }
  
  //       return newValues
  //     })
      
  
  //   }
  
  //   // Submit Button
  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     console.log("Submit");
  
  //     submitIntake(intakeData).then((res) => {
  //       console.log(res.data);
  //       localStorage.setItem("intakeId", "null");
  //       localStorage.setItem("intakeResponses", "null");
  //       setIntakeData((old) => {
  
  //         // New object for return
  //         const newValues = {
  //           intakeId: localStorage.getItem("intakeId"),
  //           clientId: old.clientId,
  //           intakeResponse: localStorage.getItem("intakeResponses")
  //         }
  
  //         return newValues
  //       });
  //     }).catch((err) => console.log(err));
  //   }
  
  //   // Save & Close Button
  //   function handleSaveAndClose(e) {
  //     e.preventDefault();
  //     console.log("Save & Close");
  //     saveIntake(intakeData).then((res) => {
  //       console.log(res.data);
  //       localStorage.setItem("intakeId", res.data._id);
  //       localStorage.setItem("intakeResponses", JSON.stringify(res.data.intakeResponse));
  //       setIntakeData((old) => {
  
  //         // New object for return
  //         const newValues = {
  //           intakeId: localStorage.getItem("intakeId"),
  //           clientId: old.clientId,
  //           intakeResponse: localStorage.getItem("intakeResponses")
  //         }
  
  //         return newValues
  //       });
        
  //     }).catch((err) => console.log(err));
  //<NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
  //   }

  // }

  

  
    return(

      <div className="intake-wrapper">
        {/* Navbar */}
        <header style={{ paddingLeft: 0 }}>
        <Navbar bg="light" expand="lg" className="ms-auto">
          <Container>

            <Navbar.Brand href="#home">
              <img src="./final-ep-logo.png" alt="bug" height={100} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
             <Nav className="ms-auto">
               <Nav.Item title="Logout" id="basic-nav" onClick={toLogin}>Logout</Nav.Item>
             </Nav>
           </Navbar.Collapse>
        
          </Container>
        </Navbar>
        </header>
        {/* Jumbotron */}
        <div className='head-approved p-5 text-center'>
          <h1 className='mb-3'>Approved Intake Forms</h1>
        </div>

        <div className="intake-body container" style={{paddingTop: "1%"}}>
          {/* Intake 1 */}
          <div class="rectangle" onClick={toApprovedIntake}>
						<h5 class="d-flex justify-content-center">Intake #001</h5>
					</div>

          {/* Intake 2 */}
          <div class="rectangle">
						<h5 class="d-flex justify-content-center">Intake #002</h5>
					</div>
          

          {/* Intake 3 */}
          <div class="rectangle">
						<h5 class="d-flex justify-content-center">Intake #003</h5>
					</div>

          






          <div className="row">
            <div className="col-sm-12 text-center">
              <button className="button-approved center-block">See More</button>
            </div>
          </div>
        </div>
      </div>

      
       
  )
}

export default ApprovedIntakes;