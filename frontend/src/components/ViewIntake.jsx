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
        setIntakeName(result.data[0].name)
        
        if (result.data[0].intakeResponse[2] === '') {
          result.data[0].intakeResponse[2] = 'No';
        }
        if (result.data[0].intakeResponse[3] === '') {
          result.data[0].intakeResponse[3] = 'No';
        }

        setIntakeResponse(result.data[0].intakeResponse);
      });
    } else {
      getIntakeByIntakeId(currentIntakeId).then((result) => {
        setIntakeName(result.data.name)
        setIntakeResponse(result.data.intakeResponse);
        if (result.data.intakeResponse[2] === '') {
          result.data.intakeResponse[2] = 'No';
        }
        if (result.data.intakeResponse[3] === '') {
          result.data.intakeResponse[3] = 'No';
        }
      });
    }

  }, []);

  const [intakeResponse, setIntakeResponse] = useState(["","","","","",""]);
  const [intakeName, setIntakeName] = useState("");

  return (
    <div className="intake-wrapper">
      {/* Navbar */}
      <header style={{ paddingLeft: 0 }}>
        <ClientNav/>
      </header>

      {/* Jumbotron */}
      <div className='p-5 text-center bg-info'>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>View Intake Form: {intakeName}</h1>
      </div>

      <div className="intake-body container" style={{paddingTop: "1%"}}>

        {/* Question 1 */}
        <div className="row question1-wrapper">
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Why is this training needed?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[0]}</p>
        </div>

        {/* Question 2 */}
        <div className="row question2-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Can you describe the current gap that exists?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[1]}</p>
        </div>

        {/* Question 3 */}
        <div className="row question3-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Was there an identified problem that brought this to your attention? If so, what was the problem?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[2]}</p>
        </div>

        {/* Question 4 */}
        <div className="row question4-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Is there data? If so, what has the data shown?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[3]}</p>
        </div>

        {/* Question 5 */}
        <div className="row question5-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>How will we measure success of this training?</b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[4]}</p>
        </div>

        {/* Question 6 */}
        <div className="row question6-wrapper" style={{paddingTop: "2%"}}>
          <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Who are your champions for this training development project? Please include name(s) and email(s). </b></h3>
          <p style={{border: "1px solid black", minHeight:"100px"}}>{intakeResponse[5]}</p>
        </div>

      </div> 
      
    </div>

  );
}
export default ViewIntake;

