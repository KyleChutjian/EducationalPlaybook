import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../services/authService';
import { getAccountsByRole } from '../services/userService';
import { editIntakeStatusByIntakeId, getIntakeByIntakeId, getIntakesByProgramLeadIdByStatus, getOpenIntakeByClientId } from '../services/intakeService';
import ClientNav from './ClientNav';
import Modal from 'react-bootstrap/Modal';
import {Card} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select';


function ViewIntake() {
  const history = useNavigate();
  const projectLeadNameArray = new Array();
  const projectLeadIdArray = new Array();
  const option= [];
  const leadName = [];



//Project Lead Hooks
const [projectLeads, setProjectLeads] = useState(null);

  const toAssignIntake = () => {
    // Update the route
    let path = '/AssignIntake';
    history(path);
  };
  let buttonStatus = "";
  const currentIntakeId = localStorage.getItem("currentIntakeId");

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
    // Get Accounts using Status
    getAccountsByRole("PROJECTLEAD").then((projectLeads) => {

      setProjectLeads(projectLeads);
      //loadLeads(projectLeads.data);

      for(var i = 0; i < projectLeads.data.length; i++){
        var currentName = projectLeads.data[i].firstName + " " + projectLeads.data[i].lastName;
        var currentId = projectLeads.data[i]['_id'];

        if(projectLeadNameArray.indexOf(currentName) < 0){
          projectLeadNameArray.push(currentName);
          projectLeadIdArray.push(currentId);
          var obj = {};
          obj['lead'] = currentName;
          obj['id'] = currentId;
          option.push(obj);

        }
    
        //projectLeadIdArray.push(currentId['_id']);
        // var obj = {};
        // obj['lead'] = currentName;
        // options.push(obj);



        // 
      }

      const test = option.map((o) => {return o.lead});
      console.log(test);

      console.log(projectLeadNameArray);
      console.log(projectLeadIdArray);
      console.log(option);
      //loadLeads(projectLeadNameArray)


    });

      


    

    


  }, []);
  //const [option] = useState(options);

  function editStatusToApprove(){
    if(buttonStatus == "clicked"){
      editIntakeStatusByIntakeId(currentIntakeId, "Approved");
    }

  }

  function editStatusToDeny(){
    if(buttonStatus == "clicked"){
      editIntakeStatusByIntakeId(currentIntakeId, "Archived");
    }

  }



  const loadLeads = (leads) => {
    setProjectLeads(
      
      
      leads.map((lead,index)=> {
          return(


                <option>{lead}</option>



          )
        
          

          


     
      // leads.map((projectLeads, index) => {
      //   return(
      //     <div className="container" key={index}>
      //       <div className="row" style={{paddingTop: "1%"}}>


            
      //         {/* <h3>Assign Project Lead</h3>
      //         <Multiselect options={options} displayValue = "Project Lead"/> */}

      //     {/* <Card id='card2' className="text-center mx-auto" style={{ background: '#D3D3D3', width: '60rem', margin:'5px', color:'whitesmoke', fontFamily: 'Bitter'}}>
      //       <Card.Body>
      //         <Card.Title style={{fontSize:'30px'}}> */}
      //           {/* <MDBCardLink onClick={button2} style={{color:'whitesmoke'}}>Needs Assessment</MDBCardLink>  */}
      //           {/* <Button name={index} variant='outline-dark' size='lg' style={{width: "350px", fontSize: "28px"}}>{projectLeadNameArray[index]}<u>{}</u></Button>
      //         </Card.Title>
      //       </Card.Body>
      //     </Card> */}

      //       </div>
      //     </div>
      //   ) 
      }
     )
    )
  }



    // Modal open hook
    const [open, setOpen] = useState(false);



    // Handles Create New Account Submission
    const submitModal = (e) => {
      e.preventDefault();
      setOpen(false);
      
    };


  const [intakeResponse, setIntakeResponse] = useState(["","","","","",""]);
  const [intakeName, setIntakeName] = useState("");

  const handleOpenModal = () =>setOpen(true);
  const handleCloseModal = () => setOpen(false);



  return (
    <div className="intake-wrapper">
      {/* Navbar */}
      <header style={{ paddingLeft: 0 }}>
        <ClientNav/>
      </header>

      {/* Jumbotron */}
      <div className='p-5 text-center' style={{backgroundColor: '#0098C3', color:'whitesmoke'}}>
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

        {/* Modal */}
        <div className="mb-3">
              <Modal show={open} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Assign Project Lead</Modal.Title>
                </Modal.Header>
                  <Modal.Body>

                   <Select class="select" options={projectLeadNameArray}>
                   
                   
                   </Select>



                    


                  

                   {/* <Select class="select" options={option}>
                   
                   
                   </Select> */}
                   <label class="form-label select-label">Example label</label>

                 
              
                 

                   

                  </Modal.Body>
                  

                  <Modal.Footer>
                    <Button style={{background:'#6E9A35'}} onClick={submitModal}>Submit</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  </Modal.Footer>

              </Modal>
          </div>

        

         {/* Buttons */}

         <div className="login-button" style={{paddingBottom: "0.3%"}}>
            <button type="submit" onClick={()=>{

            }} className="btn btn-success" style={{width:'50%',fontFamily: 'Bitter', background:'#d2492a'}}>Deny</button>
          </div>
          <div className="create-account-button">
            <Button variant="primary" onClick={handleOpenModal} style={{width:'50%',fontFamily: 'Bitter', background: '#a40084'}}>Approve&Assign</Button>
          </div>

         {/* <div className="row" style={{paddingTop: "2%", paddingBottom: "5%"}}>
          <div className="col-sm-12 text-center" style={{display: "flex", justifyContent: "center", columnGap: "20px"}}>


            <button
                  id="approveandassignbutton"
                  className="btn btn-success btn-md center-block"
                  style={{width: "150px", fontFamily:'Bitter'}}
                  onClick={() => {
                    buttonStatus = "clicked";
                    editStatusToApprove();
                  }}
      

                >Approve</button>
            
            <button 
                  id="denybutton"
                  className="btn btn-danger btn-md center-block"
                  style={{width: "150px", fontFamily:'Bitter'}}
                  onClick={() => {
                    buttonStatus = "clicked";
                    editStatusToDeny();
                  }}
                
          

                >Deny</button>

          </div>
        </div> */}

      </div> 
      
    </div>

  );
}
export default ViewIntake;

