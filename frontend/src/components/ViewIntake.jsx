import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../services/authService';
import { getIntakeByIntakeId, getOpenIntakeByClientId } from '../services/intakeService';
import ClientNav from './ClientNav';

function ViewIntake() {
  const history = useNavigate();

  useEffect(() => {

    // Get Current User
    const currentUser = getCurrentUser();

    const permissionLevel = localStorage.getItem("permission-level");
    const currentIntakeId = localStorage.getItem("currentIntakeId");

    if (permissionLevel === "client") {
      // Get Open Intake by ClientID
      getOpenIntakeByClientId(currentUser.id).then((result) => {
        setIntakeResponse(result.data[0].intakeResponse);
      });
    } else {
      getIntakeByIntakeId(currentIntakeId).then((result) => {
        setIntakeResponse(result.data.intakeResponse);
      });
    }



  }, []);

  const [intakeResponse, setIntakeResponse] = useState(["","","","","",""]);


  return (
    <div className="intake-wrapper">
      {/* Navbar */}
      <header style={{ paddingLeft: 0 }}>
        <ClientNav/>
      </header>

      {/* Jumbotron */}
      <div className='p-5 text-center bg-info'>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>View Intake Form</h1>
      </div>

      <div className="intake-body container" style={{paddingTop: "1%"}}>

        {/* Question 1 */}
        <div className="row question1-wrapper">
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Why is this training needed?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[0]}</p>
          {/* <MDBTextArea id='question1' rows={4} name="question1" defaultValue={intakeResponse[0]}/> */}
        </div>

        {/* Question 2 */}
        <div className="row question2-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Can you describe the current gap that exists?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[1]}</p>
          {/* <MDBTextArea id='question2' rows={4} name="question2" defaultValue={intakeResponse[1]}/> */}
        </div>

        {/* Question 3 */}
        <div className="row question3-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Was there an identified problem that brought this to your attention? If so, what was the problem?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[2]}</p>
          {/* <MDBTextArea id='question3' rows={4} name="question3" defaultValue={intakeResponse[2]}/> */}
        </div>

        {/* Question 4 */}
        <div className="row question4-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Is there data? If so, what has the data shown?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[3]}</p>
          {/* <MDBTextArea id='question4' rows={4} name="question4" defaultValue={intakeResponse[3]}/> */}
        </div>

        {/* Question 5 */}
        <div className="row question5-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>How will we measure success of this training?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[4]}</p>
          {/* <MDBTextArea id='question5' rows={4} name="question5" defaultValue={intakeResponse[4]}/> */}
        </div>

        {/* Question 6 */}
        <div className="row question6-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Who are your champions for this training development project? Please include name(s) and email(s). </b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[5]}</p>
          {/* <MDBTextArea id='question6' rows={4} name="question6" defaultValue={intakeResponse[5]}/> */}
        </div>

      </div> 
      
    </div>

  );
}
export default ViewIntake;

