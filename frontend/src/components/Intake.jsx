import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import { saveIntake, submitIntake, adminApproveIntake, programleadApproveIntake, editIntakeByIntakeId } from '../services/intakeService';
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
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import ClientNav from './ClientNav';

function Intake() {
  const history = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    password: "",
    isProgramLead: false,
    isAdmin: false
  });

  const intakeResponsesJSON = localStorage.getItem("intakeResponses");
  var intakeResponses;
  if (intakeResponsesJSON === "null") {
    intakeResponses = ["","","","","",""];
  } else {
    console.log(localStorage.getItem("intakeResponses"));
    intakeResponses = JSON.parse(localStorage.getItem("intakeResponses"));
  }

  const [intakeData, setIntakeData] = useState({
    intakeId: localStorage.getItem("intakeId"),
    clientId: localStorage.getItem("userId"),
    intakeResponse: 
    [
      intakeResponses[0], // 1. Why is this training needed?
      intakeResponses[1], // 2. Can you desctibe the current gap that exists?
      intakeResponses[2], // 3. Was there an identified problem that brought this to your attention?
      intakeResponses[3], // 4. Is there data?
      intakeResponses[4], // 5. How will we measure success of this training?
      intakeResponses[5]  // 6. Who are your champions for this training development project?
    ]
  })

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
      history("/dashboard");
    }).catch((err) => console.log(err));
  }

  // Save & Close Button
  function handleSaveAndClose(e) {
    e.preventDefault();
    console.log("Save & Close");
    saveIntake(intakeData).then((res) => {
      console.log(res.data);
      localStorage.setItem("intakeId", res.data._id);
      console.log(JSON.stringify(res.data.intakeResponse));
      // localStorage.setItem("intakeResponses", JSON.stringify(res.data.intakeResponse));
      setIntakeData((old) => {

        // New object for return
        const newValues = {
          intakeId: localStorage.getItem("intakeId"),
          clientId: old.clientId,
          intakeResponse: localStorage.getItem("intakeResponses")
        }
        console.log(newValues);
        return newValues
      });
      history("/dashboard");
    }).catch((err) => console.log(err));
  }

  return (
    <div className="intake-wrapper">
      {/* Navbar */}
      <header style={{ paddingLeft: 0 }}>
        <ClientNav/>
      </header>

      {/* Jumbotron */}
      <div className='p-5 text-center bg-info'>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>New Intake Form</h1>
      </div>
      
      <div className="intake-body container" style={{paddingTop: "1%"}}>

        {/* Question 1 */}
        <div className="row question1-wrapper">
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Why is this training needed?</h3>
          <MDBTextArea id='question1' rows={4} name="question1" defaultValue={intakeResponses[0]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 2 */}
        <div className="row question2-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Can you describe the current gap that exists?</h3>
          <MDBTextArea id='question2' rows={4} name="question2" defaultValue={intakeResponses[1]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 3 */}
        <div className="row question3-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Was there an identified problem that brought this to your attention? If so, what was the problem?</h3>
          <MDBTextArea id='question3' rows={4} name="question3" defaultValue={intakeResponses[2]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 4 */}
        <div className="row question4-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Is there data? If so, what has the data shown?</h3>
          <MDBTextArea id='question4' rows={4} name="question4" defaultValue={intakeResponses[3]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 5 */}
        <div className="row question5-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>How will we measure success of this training?</h3>
          <MDBTextArea id='question5' rows={4} name="question5" defaultValue={intakeResponses[4]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 6 */}
        <div className="row question6-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Who are your champions for this training development project? Please include name(s) and email(s). </h3>
          <MDBTextArea id='question6' rows={4} name="question6" defaultValue={intakeResponses[5]} onChange={handleIntakeResponseChange}/>
        </div>






        <div className="row" style={{paddingTop: "2%", paddingBottom: "5%"}}>
          <div className="col-sm-12 text-center" style={{display: "flex", justifyContent: "center", columnGap: "20px"}}>
            {/* Save & Close Form */}
            <form id="save-close-form" onSubmit={handleSaveAndClose}>
              <span style={{paddingRight: "1%"}}>
                <button
                  id="saveAndCloseIntakeButton2"
                  className="btn btn-success btn-md center-block"
                  type="submit"
                  form="save-close-form"
                  onSubmit={handleSaveAndClose}
                  style={{width: "150px", fontFamily:'Bitter'}}

                >Save & Close</button>
              </span>
            </form>
            {/* Submit Form */}
            <form onSubmit={handleSubmit}>
              <span style={{paddingLeft: "1%"}}>
                <button 
                  id="submitIntakeButton" 
                  className="btn btn-primary btm-md center-block"
                  type="submit"
                  onSubmit={handleSubmit}
                  style={{width: "150px", display: "inline-block", verticalAlign: "top", fontFamily:'Bitter'}}
                  >Submit</button>
              </span>
            </form>

          </div>
        </div>

      </div> 
      
    </div>

  );
}
export default Intake;

