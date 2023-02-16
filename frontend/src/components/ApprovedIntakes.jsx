import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
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