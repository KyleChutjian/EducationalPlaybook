import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
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


  function ApprovedIntake() {
    // const clientId = useRef(0);
    // const [intakeId, setIntakeId] = useState();  
  
    const [account, setAccount] = useState({
      email: "",
      password: "",
      isProgramLead: true,
      isAdmin: true
    });

    const approvedIntakesJSON = localStorage.getItem("approvedIntakes");
    var approvedIntakes;
    if (approvedIntakesJSON === "null") {
      approvedIntakes = ["","","","","",""];
    } else {
    approvedIntakes = JSON.parse(localStorage.getItem("approvedIntakes"));
    }
  
  
    
  
    // useEffect(() => {
    //   console.log("page loaded");
    // }, []);
  
  
  
    function handleIntakeResponseChange(e) {
      const { name, value } = e.target;
  
      setIntakeData((old) => {
        // Get Queston number index
        const indexString = name.split("question")[1];
        const index = parseInt(indexString) - 1;
  
        // Redefine updated response
        old.intakeResponse[index] = value;
  
        // New object for return
        const newValues = {
          intakeId: old.intakeId,
          clientId: old.clientId,
          intakeResponse: old.intakeResponse
        }
  
        return newValues
      })
      
  
    }
  
    // Submit Button
    function handleSubmit(e) {
      e.preventDefault();
      console.log("Submit");
  
      submitIntake(intakeData).then((res) => {
        console.log(res.data);
        localStorage.setItem("intakeId", "null");
        localStorage.setItem("intakeResponses", "null");
        setIntakeData((old) => {
  
          // New object for return
          const newValues = {
            intakeId: localStorage.getItem("intakeId"),
            clientId: old.clientId,
            intakeResponse: localStorage.getItem("intakeResponses")
          }
  
          return newValues
        });
      }).catch((err) => console.log(err));
    }
  
    // Save & Close Button
    function handleSaveAndClose(e) {
      e.preventDefault();
      console.log("Save & Close");
      saveIntake(intakeData).then((res) => {
        console.log(res.data);
        localStorage.setItem("intakeId", res.data._id);
        localStorage.setItem("intakeResponses", JSON.stringify(res.data.intakeResponse));
        setIntakeData((old) => {
  
          // New object for return
          const newValues = {
            intakeId: localStorage.getItem("intakeId"),
            clientId: old.clientId,
            intakeResponse: localStorage.getItem("intakeResponses")
          }
  
          return newValues
        });
        
      }).catch((err) => console.log(err));
    }

  }

  

  
    return(

      <div className="intake-wrapper">
        {/* Navbar */}
        <header style={{ paddingLeft: 0 }}>
          <MDBNavbar expand='lg' light bgColor='white'>
            <MDBContainer fluid>
              <MDBNavbarToggler
                aria-controls='navbarExample01'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <MDBIcon fas icon='bars' />
              </MDBNavbarToggler>
              <div className='collapse navbar-collapse' id='navbarExample01'>
                <MDBNavbarNav right className='mb-2 mb-lg-0'>
                  <MDBNavbarItem active>
                    <MDBNavbarLink aria-current='page' href='#'>
                      Sample Navbar
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  
                </MDBNavbarNav>
              </div>
            </MDBContainer>
          </MDBNavbar>
        </header>
        {/* Jumbotron */}
        <div className='head-approved p-5 text-center'>
          <h1 className='mb-3'>Approved Intake Forms</h1>
        </div>

        <div className="intake-body container" style={{paddingTop: "1%"}}>
          {/* Intake 1 */}
          <div class="rectangle">
						<h5 class="d-flex justify-content-center">Intake #001</h5>
					</div>

          {/* Intake 2 */}
          <div class="rectangle">
						<h5 class="d-flex justify-content-center">Intake #002</h5>
					</div>
          

          {/* Question 3 */}
          <div class="rectangle">
						<h5 class="d-flex justify-content-center">Intake #003</h5>
					</div>

          






          <div className="row" style={{paddingTop: "2%", paddingBottom: "5%"}}>
            <div className="col-sm-12 text-center">
              <span style={{paddingRight: "1%"}}>
                <MDBBtn 
                  id="saveAndCloseIntakeButton" 
                  className="button-approved"
                  style={{width: "150px"}}
                  >View More</MDBBtn>
              </span>
              

            </div>
          </div>

        </div>
      </div>

      
       
  )
}

export default ApprovedIntakes;