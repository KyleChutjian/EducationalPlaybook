import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getAccountsByRole } from '../services/userService';
import { getIntakeByIntakeId, assignProjectLeadsByIntakeId, projectleadApproveIntake, editIntakeStatusByIntakeId, getOpenIntakeByClientId } from '../services/intakeService';
import ClientNav from './ClientNav';
import AdminNav from './AdminNav';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { getCurrentUser } from '../services/authService';

function ViewIntake() {
  const history = useNavigate();

  const [ status, setStatus ] = useState("approved");

  // Modal open hook
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [intakeResponse, setIntakeResponse] = useState(["","","","","",""]);
  const [intakeName, setIntakeName] = useState("");


  //Project Lead Hooks
  const [ projectLeads, setProjectLeads] = useState([]);
  const [ selectedProjectLeads, setSelectedProjectLeads ] = useState([]);
  const currentIntakeId = localStorage.getItem("currentIntakeId");

  useEffect(() => {
    
  }, [projectLeads]);

  useEffect(() => {
    const currentIntakeId = localStorage.getItem("currentIntakeId");
    var status = "";

    if (localStorage.getItem('permission-level') === 'client') {
      getOpenIntakeByClientId(getCurrentUser().id).then((result) => {
        setIntakeName(result.data[0].name)
        
        if (result.data[0].intakeResponse[2] === '') {
          result.data[0].intakeResponse[2] = 'No';
        }
        if (result.data[0].intakeResponse[3] === '') {
          result.data[0].intakeResponse[3] = 'No';
        }
        status = result.data[0].status;
        setStatus(status.toLowerCase())
        setIntakeResponse(result.data[0].intakeResponse);
      })
    } else {
      getIntakeByIntakeId(currentIntakeId).then((result) => {
        setIntakeName(result.data.name)
        setIntakeResponse(result.data.intakeResponse);
        status = result.data.status;
        setStatus(status.toLowerCase())
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
      const leads = projectLeads.data.map((lead) => {
        return {
          label: `${lead.firstName} ${lead.lastName}`,
          value: lead._id
        }
      });
      setProjectLeads(leads);
    });
  }, []);

  const handleSelectProjectLeads = (e) => {
    setSelectedProjectLeads(e);
  }

  // Handles Create New Account Submission
  const submitModal = (e) => {
    e.preventDefault();
    setOpen(false);
    const selectedIds = selectedProjectLeads.map((leads) => {
      return leads.value;
    })
    assignProjectLeadsByIntakeId(currentIntakeId, {projectLeadIds: selectedIds});
    history("/admindashboard");
  };
  const handleApprovePL = () => {
    projectleadApproveIntake({
      intakeId: currentIntakeId
    })
    history("/pldashboard");
  }

  const handleDeny = () => {
    console.log('Deny');

    // Set status to "archived-denied"
    editIntakeStatusByIntakeId(currentIntakeId, "archived-denied");

    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      history("/admindashboard");
    } else if (permissionLevel === "projectlead") {
      history("/pldashboard");
    } else {
      console.log('Something went wrong');
    }
  }

  return (
    <div className="intake-wrapper">
      {/* Modal */}
      <div className="mb-3">
        <Modal show={open} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontFamily: 'Bitter'}} >Assign Project Leads</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              
              <Form.Group as={Col} controlId='projectleads'>
                <Form.Label style={{fontFamily: 'Bitter'}}>Project-Leads:</Form.Label>
                <Select 
                  closeMenuOnSelect={false} 
                  isMulti 
                  options={projectLeads} 
                  onChange={handleSelectProjectLeads}
                />
              </Form.Group>
            </Modal.Body>
            

            <Modal.Footer>
              <Button style={{background:'#6E9A35', fontFamily: 'Bitter'}} onClick={submitModal}>Approve & Assign</Button>
              {/* <Button variant="secondary" onClick={handleCloseModal}>Close</Button> */}
            </Modal.Footer>

        </Modal>
      </div>
      {/* Navbar */}
      {localStorage.getItem('permission-level') === 'admin' ? <AdminNav/> : <ClientNav/>}

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

         {/* Buttons */}
        <div className="create-account-button text-center">
          {localStorage.getItem("permission-level") === "admin"  && status === "pending-admin" ? 
            <div style={{paddingBottom: '1%'}}>
              <Button variant="primary" onClick={handleOpenModal} style={{width:'20%',fontFamily: 'Bitter', background: '#6E9A35', marginRight: '1%'}}>Approve & Assign</Button>
              <Button variant="danger" onClick={handleDeny} style={{width:'20%',fontFamily: 'Bitter', marginLeft: '1%'}}>Deny</Button>
            </div> : null}
          {localStorage.getItem("permission-level") === "projectlead" && status === "pending-projectlead" ? 
            <div style={{paddingBottom: '1%'}}>
              <Button variant="primary" onClick={handleApprovePL} style={{width:'20%',fontFamily: 'Bitter', background: '#6E9A35', marginRight: '1%'}}>Approve</Button>
              <Button variant="danger" onClick={handleDeny} style={{width:'20%',fontFamily: 'Bitter', marginLeft: '1%'}}>Deny</Button>
            </div>:null}

          {/* {approveButton} */}
        </div>

      </div> 
      
    </div>

  );
}
export default ViewIntake;

