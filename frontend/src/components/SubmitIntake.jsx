import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../services/authService';
import { saveIntake, submitIntake, getIntakesByClientIdByStatus } from '../services/intakeService';
import { MDBTextArea } from 'mdb-react-ui-kit';
import ClientNav from './ClientNav';

function SubmitIntake() {
  const history = useNavigate();

  useEffect(() => {

    // Get Current User
    const currentUser = getCurrentUser();
    setClientId(currentUser.id);
    
    // Use clientId to get their only pending-client intake form
    getIntakesByClientIdByStatus(currentUser.id, "pending-client").then((res) => {
      if (res.data.length === 1) {
        // If there is an open intake form, set intakeId and intakeResponse variables
        setIntakeId(res.data[0]._id);
        setIntakeResponse(res.data[0].intakeResponse);
      } else if (res.data.length !== 0) {
        // If more than 1 intake form is open, something is wrong
        console.error(`User with id ${res.data[0].clientId} has more than 1 pending-client intake`);
      }

    })
  }, []);

  const [intakeId, setIntakeId] = useState(null);
  const [clientId, setClientId] = useState("");
  const [intakeResponse, setIntakeResponse] = useState(["","","","","",""]);

  // Updates intakeResponse with new changes
  function handleIntakeResponseChange(e) {
    const { name, value } = e.target;

    setIntakeResponse((oldResponses) => {
      // Get Queston number index
      const indexString = name.split("question")[1];
      const index = parseInt(indexString) - 1;

      // Redefine updated response
      oldResponses[index] = value;

      return oldResponses;
    });
  }

  // Submit Button
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submit");

    submitIntake({
      intakeId: intakeId,
      clientId: clientId,
      intakeResponse: intakeResponse
    });
    history("/clientdashboard");
  }

  // Save & Close Button
  function handleSaveAndClose(e) {
    e.preventDefault();
    console.log("Save & Close");
    saveIntake({
      intakeId: intakeId,
      clientId: clientId,
      intakeResponse: intakeResponse
    });
    history("/clientdashboard");

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
          <MDBTextArea id='question1' rows={4} name="question1" defaultValue={intakeResponse[0]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 2 */}
        <div className="row question2-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Can you describe the current gap that exists?</h3>
          <MDBTextArea id='question2' rows={4} name="question2" defaultValue={intakeResponse[1]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 3 */}
        <div className="row question3-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Was there an identified problem that brought this to your attention? If so, what was the problem?</h3>
          <MDBTextArea id='question3' rows={4} name="question3" defaultValue={intakeResponse[2]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 4 */}
        <div className="row question4-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Is there data? If so, what has the data shown?</h3>
          <MDBTextArea id='question4' rows={4} name="question4" defaultValue={intakeResponse[3]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 5 */}
        <div className="row question5-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>How will we measure success of this training?</h3>
          <MDBTextArea id='question5' rows={4} name="question5" defaultValue={intakeResponse[4]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Question 6 */}
        <div className="row question6-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Who are your champions for this training development project? Please include name(s) and email(s). </h3>
          <MDBTextArea id='question6' rows={4} name="question6" defaultValue={intakeResponse[5]} onChange={handleIntakeResponseChange}/>
        </div>

        {/* Buttons */}
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
export default SubmitIntake;

