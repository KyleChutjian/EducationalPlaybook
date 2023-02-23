import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { useNavigate } from "react-router-dom";
import { getCurriculumByIntakeId, addLearningObjectiveByCurriculumId } from '../services/curriculumService';
import TextField from "@mui/material/TextField";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBTextArea } from 'mdb-react-ui-kit';

function EditCurriculum() {
  const history = useNavigate();

  const [ adminNavbar, setAdminNavbar ] = useState(false);
  localStorage.setItem("currentIntakeId", "63f52c4d02554f88c031c537"); // TEMPORARY, waiting for sadjell
  const [ currentIntakeId, setCurrentIntakeId] = useState(localStorage.getItem("currentIntakeId"));

  // Curriculum Hooks
  const [ curriculumId, setCurriculumId ] = useState("");
  const [ curriculumTitle, setCurriculumTitle ] = useState("");
  const [ curriculumLearningObjectives, setCurriciulumLearningObjectives ] = useState("");
  const [ curriculumSteps, setCurriciulumSteps ] = useState("");
  const [ learningObjectives, setLearningObjectives ] = useState(<div></div>);

  // Modal Hooks
  const [open, setOpen] = useState(false);
  const [newLearningObjective, setNewLearningObjective] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    } else if (permissionLevel === "programlead") {
      setAdminNavbar(false);
    }

    // Get Curriculum using CurrentIntakeId
    getCurriculumByIntakeId(currentIntakeId).then((curriculum) => {
      setCurriculumId(curriculum.data._id);
      setCurriculumTitle(`Edit Curriculum Development Plan: ${curriculum.data.name}`);
      return(curriculum)
    }).then((curriculum) => {
      setCurriciulumLearningObjectives(curriculum.data.objectives);
      setCurriciulumSteps(curriculum.data.steps);
      loadLearningObjectives(curriculum.data.objectives);
    });
      
  }, [currentIntakeId]);

  // LO: Mapping all learning objectives into HTML
  const loadLearningObjectives = (objectives) => {
    setLearningObjectives(
      objectives.map((learningObjective, index) => {
        return(
          <div className="container" key={learningObjective[0]}>
            <div className="row" style={{paddingTop: "1%"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Learning Objective #${index+1}`}</b></h3>
              <MDBTextArea className="col-md-3" rows={1} name={`title${index}`} defaultValue={learningObjective[0]} onChange={handleLearningObjectivesResponseChange}/>
              <MDBTextArea style={{marginTop: "1%", marginBottom: "1%"}} rows={4} name={`description${index}`} defaultValue={learningObjective[1]} onChange={handleLearningObjectivesResponseChange}/>
              {index !== objectives.length-1 ? <hr style={{height: "2px"}}></hr> : null}
            </div>
          </div>
        )
      }
    ))
  }

  // LO: Handles Learning Objective Response changes
  const handleLearningObjectivesResponseChange = (e) => {
    const { name, value} = e.target;
    let indexString, index;
    setCurriciulumLearningObjectives((oldObjectives) => {
      if (name.includes("title")) {
        indexString = name.split("title")[1];
        index = parseInt(indexString);
        oldObjectives[index][0] = value;
      } else if (name.includes("description")) {
        indexString = name.split("description")[1];
        index = parseInt(indexString);
        
        oldObjectives[index][1] = value;
      } else {
        console.log("Something went wrong");
      }
      return oldObjectives;
    });
  }

  // LO: Handles Create Button for New Learning Objective
  const createNewLearningObjectiveModal = (e) => {
    e.preventDefault();
    setOpen(false);
    
    const newLearningObjectiveArray = [newLearningObjective.title, newLearningObjective.description];
    curriculumLearningObjectives.push(newLearningObjectiveArray);
    loadLearningObjectives(curriculumLearningObjectives)
  };

  // Updates New Learning Objective Being Created
  function handleLearningObjectiveModalChange(e) {
    const { name, value } = e.target;

    setNewLearningObjective((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  // Opening and closing Add New Learning Objective
  const handleOpenNewLearningObjective = () => setOpen(true);
  const handleCloseNewLearningObjective = () => setOpen(false);

  // Save Changes Button
  const saveChanges = () => {
    console.log(curriculumLearningObjectives)
  }

  return(
    <div>
      <div>
        {adminNavbar ? <AdminNav/> : <ClientNav/>}
      </div>

      {/* Jumbotron */}
      <div className='p-5 text-center' style={{backgroundColor: "#F59375"}}>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>{curriculumTitle}</h1>
      </div>

      {/* Learning Objectives */}
      <h3 className="learning-objectives-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Learning Objectives</b></h3>
      <div className="learning-objectives-container">
        {/* Loaded Learning Objectives */}
        {learningObjectives}

        {/* Add New Learning Objective */}
        <div className="add-learning-objective text-center" style={{paddingTop: "1%"}}>
            <Button variant="success" onClick={handleOpenNewLearningObjective}>Add New</Button>
        </div>
        {/* Create New Learning Objective Modal */}
        <Modal show={open} onHide={handleCloseNewLearningObjective}>
          <Modal.Header closeButton>
            <Modal.Title>New Learning Objective</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form id="createAccountForm">
              <div className="form-group">
                <label>Name of Learning Objective</label>
                <input type="text" className="form-control" id="titleInput" name="title" onChange={handleLearningObjectiveModalChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="lastNameLabel">Description of New Learning Objective</label>
                {/* <input style={{height: "75px"}} type="text" className="form-control" id="descriptionInput" name="description" onChange={handleLearningObjectiveModalChange}/> */}
                <MDBTextArea rows={4} className="form-control" name="description" onChange={handleLearningObjectiveModalChange}></MDBTextArea>
                {/* <MDBTextArea className="col-md-3" rows={1} name={`title${index}`} defaultValue={learningObjective[0]} onChange={handleLearningObjectivesResponseChange}/> */}
              </div>
            </form>   
          </Modal.Body>
                  

          <Modal.Footer>
            <Button variant="primary" onClick={createNewLearningObjectiveModal}>Create</Button>
            <Button variant="secondary" onClick={handleCloseNewLearningObjective}>Close</Button>
          </Modal.Footer>

        </Modal>
      </div>


      {/* Save Changes Button */}
      <div className="save-changes text-center" style={{paddingTop: "1%"}}>
        <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
      </div>

    </div>
)
}

export default EditCurriculum;