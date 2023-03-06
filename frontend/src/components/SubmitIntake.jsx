import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../services/authService';
import { saveIntake, submitIntake, getIntakesByClientIdByStatus } from '../services/intakeService';
import { MDBTextArea } from 'mdb-react-ui-kit';
import ClientNav from './ClientNav';

function SubmitIntake() {
  const history = useNavigate();

  const [intakeId, setIntakeId] = useState(null);
  const [clientId, setClientId] = useState("");
  const [intakeResponse, setIntakeResponse] = useState(["","","","","",""]);
  const [intakeName, setIntakeName] = useState("");
  const [isRadio1Visible, setIsRadio1Visible] = useState(false);
  const [isRadio2Visible, setIsRadio2Visible] = useState(false);
  const [radio1YesHTML, setRadio1YesHTML] = useState(<div></div>)
  const [radio1NoHTML, setRadio1NoHTML] = useState(<div></div>)
  const [radio2YesHTML, setRadio2YesHTML] = useState(<div></div>)
  const [radio2NoHTML, setRadio2NoHTML] = useState(<div></div>)

  const radioResponse1HTML = <div>
    <h3 style={{fontFamily: 'Bitter', fontSize:'20px', paddingTop:'1%'}}>What was the problem?</h3>
    <MDBTextArea id='question3' rows={4} name="question3" defaultValue={intakeResponse[2]} onChange={handleIntakeResponseChange}/>
  </div>;

  const radioResponse2HTML = <div>
    <h3 style={{fontFamily: 'Bitter', fontSize:'20px', paddingTop:'1%'}}>What has the data shown?</h3>
    <MDBTextArea id='question4' rows={4} name="question4" defaultValue={intakeResponse[3]} onChange={handleIntakeResponseChange}/>
  </div>

  useEffect(() => {

    // Get Current User
    const currentUser = getCurrentUser();
    setClientId(currentUser.id);
    // Use clientId to get their only pending-client intake form
    getIntakesByClientIdByStatus(currentUser.id, "pending-client").then((res) => {
      if (res.data.length === 1) {
        // If there is an open intake form, set intakeId and intakeResponse variables
        setIntakeId(res.data[0]._id);
        setIntakeName(res.data[0].name);
        setIntakeResponse(res.data[0].intakeResponse);
        
        // Radio 1
        if (res.data[0].intakeResponse[2] === '') {
          setRadio1YesHTML(<input type='radio' id='yes' name='radio1' value='yes' onClick={handleRadioButtons}/>)
          setRadio1NoHTML(<input defaultChecked={true} type='radio' id='no' name='radio1' value='no' onClick={handleRadioButtons}/>)
          setIsRadio1Visible(false);
          
        } else {
          setRadio1YesHTML(<input defaultChecked={true} type='radio' id='yes' name='radio1' value='yes' onClick={handleRadioButtons}/>)
          setRadio1NoHTML(<input type='radio' id='no' name='radio1' value='no' onClick={handleRadioButtons}/>)
          setIsRadio1Visible(true);
        }

        // Radio 2
        if (res.data[0].intakeResponse[3] === '') {
          setRadio2YesHTML(<input type='radio' id='yes' name='radio2' value='yes' onClick={handleRadioButtons}/>)
          setRadio2NoHTML(<input defaultChecked={true} type='radio' id='no' name='radio2' value='no' onClick={handleRadioButtons}/>)
          setIsRadio2Visible(false);
          
        } else {
          setRadio2YesHTML(<input defaultChecked={true} type='radio' id='yes' name='radio2' value='yes' onClick={handleRadioButtons}/>)
          setRadio2NoHTML(<input type='radio' id='no' name='radio2' value='no' onClick={handleRadioButtons}/>)
          setIsRadio2Visible(true);
        }

      } else if (res.data.length === 0) {
        // Preset Radio 1 to No
        setRadio1YesHTML(<input type='radio' id='yes' name='radio1' value='yes' onClick={handleRadioButtons}/>)
        setRadio1NoHTML(<input defaultChecked={true} type='radio' id='no' name='radio1' value='no' onClick={handleRadioButtons}/>)
        setIsRadio1Visible(false);

        // Preset Radio 2 to No
        setRadio2YesHTML(<input type='radio' id='yes' name='radio2' value='yes' onClick={handleRadioButtons}/>)
        setRadio2NoHTML(<input defaultChecked={true} type='radio' id='no' name='radio2' value='no' onClick={handleRadioButtons}/>)
        setIsRadio2Visible(false);
        
      } else {
        // If more than 1 intake form is open, something is wrong
        console.error(`User with id ${res.data[0].clientId} has more than 1 pending-client intake`);
      }
    })
  }, []);

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

  // Updates intakeName with new changes
  function handleIntakeNameChange(e) {
    const { value } = e.target;
    setIntakeName(value)
  }

  // Updates radio buttons when either one is clicked
  function handleRadioButtons(e) {
    const name = e.target.name; // Radio1/Radio2
    const value = e.target.value; // Yes/No

    if (name === "radio1") {
        if (value === "yes") {
          console.log(`opening ${name} response`);
          setIsRadio1Visible(true);
        } else {
          console.log(`closing ${name} response`);
          setIsRadio1Visible(false);
        }
    }

    if (name === "radio2") {
      if (value === "yes") {
        console.log(`opening ${name} response`);
        setIsRadio2Visible(true);
      } else {
        console.log(`closing ${name} response`);
        setIsRadio2Visible(false);
      }
  }

  }

  // Submit Button
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submit");

    // If radio1 is 'No', remove saved response
    if (!isRadio1Visible) {
      intakeResponse[2] = '';
    }

    // If radio2 is 'No', remove saved response
    if (!isRadio2Visible) {
      intakeResponse[3] = '';
    }
    console.log(intakeResponse);

    submitIntake({
      name: intakeName,
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

    // If radio1 is 'No', remove saved response
    if (!isRadio1Visible) {
      intakeResponse[2] = '';
    }

    // If radio2 is 'No', remove saved response
    if (!isRadio2Visible) {
      intakeResponse[3] = '';
    }
    console.log(intakeResponse);
    saveIntake({
      name: intakeName,
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
        {/* Name of Intake */}
        <div className="row question1-wrapper">
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Name of Problem: </h3>
          <MDBTextArea id='question1' rows={1} defaultValue={intakeName} onChange={handleIntakeNameChange}/>
        </div>

        {/* Question 1 */}
        <div className="row question1-wrapper" style={{paddingTop: "2%"}}>
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
          
          {/* Identified Problem: Yes */}
          <div className="yes">
            <label htmlFor='yes'>Yes</label>
            {radio1YesHTML}
          </div>
          {/* Identified Problem: No */}
          <div className="no">
            <label htmlFor='no'>No</label>
            {radio1NoHTML}
          </div>
          {isRadio1Visible ? radioResponse1HTML : null}
          
        </div>

        {/* Question 4 */}
        <div className="row question4-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}>Is there data?</h3>

          {/* Data: Yes */}
          <div className="yes">
            <label htmlFor='yes'>Yes</label>
            {radio2YesHTML}
          </div>
          {/* Identified Problem: No */}
          <div className="no">
            <label htmlFor='no'>No</label>
            {radio2NoHTML}
          </div>
          {isRadio2Visible ? radioResponse2HTML : null}

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

