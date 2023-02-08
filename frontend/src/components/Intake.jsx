import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import {
  MDBContainer,
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

function Intake() {

    return (
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
                  <MDBNavbarItem>
                    <MDBNavbarLink href='#'>Features</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='#'>About</MDBNavbarLink>
                  </MDBNavbarItem>
                </MDBNavbarNav>
              </div>
            </MDBContainer>
          </MDBNavbar>
        </header>
        {/* Jumbotron */}
        <div className='p-5 text-center bg-info'>
          <h1 className='mb-3'>New Intake Form</h1>
        </div>

        <div className="intake-body container" style={{paddingTop: "1%"}}>
          {/* Question 1 */}
          <div className="row question1-wrapper">
            <h3>Why is this training needed?</h3>
            <MDBTextArea id='question1' rows={4} />
          </div>

          {/* Question 2 */}
          <div className="row question2-wrapper" style={{paddingTop: "2%"}}>
            <h3>Can you describe the current gap that exists?</h3>
            <MDBTextArea id='question2' rows={4} />
          </div>

          {/* Question 3 */}
          <div className="row question3-wrapper" style={{paddingTop: "2%"}}>
            <h3>Was there an identified problem that brought this to your attention? If so, what was the problem?</h3>
            <MDBTextArea id='question3' rows={4} />
          </div>

          {/* Question 4 */}
          <div className="row question4-wrapper" style={{paddingTop: "2%"}}>
            <h3>Is there data? If so, what has the data shown?</h3>
            <MDBTextArea id='question4' rows={4} />
          </div>

          {/* Question 5 */}
          <div className="row question5-wrapper" style={{paddingTop: "2%"}}>
            <h3>How will we measure success of this training?</h3>
            <MDBTextArea id='question5' rows={4} />
          </div>

          {/* Question 6 */}
          <div className="row question6-wrapper" style={{paddingTop: "2%"}}>
            <h3>Who are your champions for this training development project? Please include name(s) and email(s). </h3>
            <MDBTextArea id='question6' rows={4} />
          </div>






          <div className="row" style={{paddingTop: "2%", paddingBottom: "5%"}}>
            <div className="col-sm-12 text-center">
              <span style={{paddingRight: "1%"}}>
                <MDBBtn 
                  id="saveAndCloseIntakeButton" 
                  className="btn btn-success btm-md center-block"
                  style={{width: "150px"}}
                  >Save & Close</MDBBtn>
              </span>
              <span style={{paddingLeft: "1%"}}>
                <MDBBtn 
                  id="submitIntakeButton" 
                  className="btn btn-primary btm-md center-block"
                  style={{width: "150px", display: "inline-block", verticalAlign: "top"}}
                  >Submit</MDBBtn>
              </span>

            </div>
          </div>

        </div>
      </div>

    );
}
// style={{paddingLeft: "1%"}}
export default Intake;

