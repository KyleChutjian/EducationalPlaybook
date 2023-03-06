import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { useNavigate } from "react-router-dom";
import { getCurriculumByIntakeId, getCurriculumByCurriculumId } from '../services/curriculumService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBTextArea } from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';

function EditCurriculum() {
  // TEMPORARY, when Sadjell is done this will be removed
  // localStorage.setItem("currentIntakeId", "63fe1f4558003c8c92cdb1fe"); 


  const fileInput = React.createRef();
  const history = useNavigate();

  const [ adminNavbar, setAdminNavbar ] = useState(false);
  const [ currentIntakeId, setCurrentIntakeId] = useState(localStorage.getItem("currentIntakeId"));

  // Curriculum Hooks
  const [ curriculumId, setCurriculumId ] = useState("");
  const [ curriculumTitle, setCurriculumTitle ] = useState("");

  // Learning Objective Hooks
  const [ curriculumLearningObjectives, setCurriciulumLearningObjectives ] = useState("");
  const [ learningObjectives, setLearningObjectives ] = useState(<div></div>);
  const [openAddObjectiveModal, setOpenAddObjectiveModal] = useState(false);
  const [newLearningObjective, setNewLearningObjective] = useState({
    title: "",
    description: ""
  });
  const handleOpenNewLearningObjective = () => setOpenAddObjectiveModal(true);
  const handleCloseNewLearningObjective = () => setOpenAddObjectiveModal(false);

  // Step Hooks
  const [ curriculumSteps, setCurriculumSteps ] = useState("");
  const [ courseSteps, setCourseSteps ] = useState(<div></div>);
  const [ openAddCourseStepModal, setOpenAddCourseStepModal ] = useState(false);
  const [ newCourseStep, setNewCourseStep ] = useState({
    title: "",
    description: ""
  });
  const handleOpenNewCourseStep = () => setOpenAddCourseStepModal(true);
  const handleCloseNewCourseStep = () => setOpenAddCourseStepModal(false);

  // Resource Hooks
  const [ curriculumResources, setCurriculumResources ] = useState("");
  const [ resources, setResources ] = useState(<div></div>);
  const [ resourceExtraOption, setResourceExtraOption ] = useState(<div></div>);
  const [ openAddResourceModal, setOpenAddResourceModal ] = useState(false);
  const [ newResource, setNewResource ] = useState({
    title: "",
    type: null, // [Link, File]
    output: null, // [URL String, File Object]
  });
  const [ resourceDropdownTypeName, setResourceDropdownTypeName ] = useState("Type of Resource");
  const handleOpenNewResource = () => {
    setOpenAddResourceModal(true);
    setResourceDropdownTypeName("Type of Resource");
    setResourceExtraOption(<div></div>);
  }
  const handleCloseNewResource = () => setOpenAddResourceModal(false);

  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }

    // Get Curriculum using CurrentIntakeId
    getCurriculumByIntakeId(currentIntakeId).then((curriculum) => {
      setCurriculumId(curriculum.data._id);
      setCurriculumTitle(`Edit Curriculum Development Plan: ${curriculum.data.name}`);
      return(curriculum)
    }).then((curriculum) => {
      setCurriciulumLearningObjectives(curriculum.data.objectives);
      setCurriculumSteps(curriculum.data.steps);
      setCurriculumResources(curriculum.data.resources);
      loadLearningObjectives(curriculum.data.objectives);
      loadSteps(curriculum.data.steps);
      loadResources(curriculum.data.resources);
    });
      
  }, [currentIntakeId]);

  // Curriculum Learning Objective Functions:
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
  const createNewLearningObjectiveModal = (e) => {
    e.preventDefault();
    setOpenAddObjectiveModal(false);
    
    const newLearningObjectiveArray = [newLearningObjective.title, newLearningObjective.description];
    curriculumLearningObjectives.push(newLearningObjectiveArray);
    loadLearningObjectives(curriculumLearningObjectives)
  };
  function handleLearningObjectiveModalChange(e) {
    const { name, value } = e.target;

    setNewLearningObjective((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  // Curriculum Step Functions:
  const loadSteps = (steps) => {
    setCourseSteps(
      steps.map((step, index) => {
        return(
          <div className="container" key={step[0]}>
            <div className="row" style={{paddingTop: "1%"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Course Step #${index+1}`}</b></h3>
              <MDBTextArea className="col-md-3" rows={1} name={`title${index}`} defaultValue={step[0]} onChange={handleCourseStepsResponseChange}/>
              <MDBTextArea style={{marginTop: "1%", marginBottom: "1%"}} rows={4} name={`description${index}`} defaultValue={step[1]} onChange={handleCourseStepsResponseChange}/>
              {index !== steps.length-1 ? <hr style={{height: "2px"}}></hr> : null}
            </div>
          </div>
        )
      }
    ))
  }
  const handleCourseStepsResponseChange = (e) => {
    const { name, value} = e.target;
    let indexString, index;

    setCurriculumSteps((oldSteps) => {
      if (name.includes("title")) {
        indexString = name.split("title")[1];
        index = parseInt(indexString);
        oldSteps[index][0] = value;
      } else if (name.includes("description")) {
        indexString = name.split("description")[1];
        index = parseInt(indexString);
        
        oldSteps[index][1] = value;
      } else {
        console.log("Something went wrong");
      }
      return oldSteps;
    });
  }
  const createNewCourseStepModal = (e) => {
    e.preventDefault();
    setOpenAddCourseStepModal(false);
    const newCourseStepArray = [newCourseStep.title, newCourseStep.description];
    curriculumSteps.push(newCourseStepArray);
    loadSteps(curriculumSteps);
  };
  function handleCourseStepModalChange(e) {
    const { name, value } = e.target;

    setNewCourseStep((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  // Curriculum Resource Functions:
  const loadResourceOutput = (type, output, index) => {
    if (type === "Link") {
      return <MDBTextArea className="col-md-3" rows={1} name={`output${index}`} defaultValue={output} onChange={handleResourceResponseChange}/>
    } else if (type === "File") {
      console.log(output);
      return <div>
        <h3 style={{fontFamily: 'Bitter', fontSize:'16px', marginTop: "1%"}}>{`Replace \"${output.name}\":`}</h3>
        <input type='file' className="form-control" id="fileInput" name={`file${index}`} onChange={handleResourceResponseChange} ref={fileInput}/>
      </div>
    }
  }

  const loadResources = (resources) => {
    if (typeof resources === 'undefined') {
      return <div></div>
    }
    setResources(
      resources.map((resource, index) => {
        return(
          <div className="container" key={resource[0]}>
            <div className="row" style={{paddingTop: "1%"}}>
              {/* Resource Header [Resource #1 - Link] */}
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Resource #${index+1} - ${resource[1]}`}</b></h3>

              {/* Resource Title [Sample Link Title]*/}
              <MDBTextArea style={{marginTop: "1%", marginBottom: "1%"}} className="col-md-3" rows={1} name={`title${index}`} defaultValue={resource[0]} onChange={handleResourceResponseChange}/>

              {/* Resource Output [https://google.com]*/}
              {loadResourceOutput(resource[1], resource[2], index)}

              {index !== resources.length-1 ? <hr style={{height: "2px", marginTop: "1%"}}></hr> : null}
            </div>
          </div>
        )
      }
    ))
  }

  const handleResourceResponseChange = (e) => {
    const { name, value} = e.target;
    let indexString, index;
    
    setCurriculumResources((oldResources) => {
      if (name.includes("title")) {
        indexString = name.split("title")[1];
        index = parseInt(indexString);
        oldResources[index][0] = value;
      } else if (name.includes("output")) {
        indexString = name.split("output")[1];
        index = parseInt(indexString);
        
        oldResources[index][2] = value;
      } else if (name.includes("file")) {
        console.log(`name: ${name}`);
        indexString = name.split("file")[1];
        index = parseInt(indexString);
        oldResources[index][2] = e.target.files[0];
      } else {
        console.log("Something went wrong");
      }
      return oldResources;
    });
  }
  const createNewResourceModal = (e) => {
    e.preventDefault();
    setOpenAddResourceModal(false);
    const newResourceArray = [newResource.title, newResource.type, newResource.output];
    if (typeof curriculumResources === 'undefined') {
      setCurriculumResources(newResourceArray)
      
    } else {
      curriculumResources.push(newResourceArray);
    }
    
    loadResources(curriculumResources);
  };
  function handleResourceModalChange(e) {
    const { name, value } = e.target;

    if (name === 'title') {
      // set the title
      setNewResource((old) => {
        return {
          ...old,
          [name]: value,
        };
      });
    } else if (name === 'link') {
      // set the type to link, update the output value
      // newResource.type = 'Link';
      setNewResource((old) => {
        return {
          title: old.title,
          type: "Link",
          output: value
        }
      })
    } else if (name === 'file') {
      // set the type to file, update the output value
      setNewResource((old) => {
        return {
          title: old.title,
          type: "File",
          output: e.target.files[0]
        }
      })
    }

  }
  const setResourceType = (type) => {
    setResourceDropdownTypeName(type);
    let extraOption;
    if (type === "Link") {
      extraOption = 
      <div className="form-group" style={{paddingTop: "2%"}}>
        <label>Link URL</label>
        <input type='url' className="form-control" id="linkInput" name="link" onChange={handleResourceModalChange}/>
      </div>
    } else if (type === "File") {
      extraOption = 
      <div className="form-group" style={{paddingTop: "2%"}}>
        <input type='file' className="form-control" id="fileInput" name="file" onChange={handleResourceModalChange} ref={fileInput}/>
      </div>
    }
    setResourceExtraOption(extraOption);
  }

  // Save Changes Button
  const saveChanges = () => {
    console.log(curriculumLearningObjectives)
    console.log(curriculumSteps);
    console.log(curriculumResources);
    console.log(curriculumResources[1][2])
  }

  const handleFile = (e) => {
    e.preventDefault();
    console.log(fileInput.current.files[0]);

    var reader = new FileReader();
    reader.readAsDataURL(fileInput.current.files[0]);
    reader.onload = () => {
      // console.log(reader.result);

      // createCurriculum({resource: reader.result})
      // .then((curriculum) => {
      //   console.log(curriculum.data);
      // });


      getCurriculumByCurriculumId("63faaeab56b581e7c9934779").then((curriculum) => {
        const curriculumResource = curriculum.data.resources;
        console.log(curriculumResource);

        const base64Resource = curriculumResource.toString("base64");

        fetch(base64Resource).then((res) => res.blob()).then((blob) => {
          const file = new File([blob], "New Document", {type: blob.type})
          console.log(file);

          // Downloading the file object
          const link = document.createElement('a');
          const url = URL.createObjectURL(file);
          link.href = url;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        });
      });


      // For future implementation:

      // createCurriculum({resource: reader.result}).then((curriculum) => {
      //   console.log(curriculum);
      // });

      // fetch(reader.result).then((res) => res.blob()).then((blob) => {
      //   const file = new File([blob], "New Document", {type: blob.type})
      //   console.log(file);

      //   // Downloading the file object
      //   const link = document.createElement('a');
      //   const url = URL.createObjectURL(file);
      //   link.href = url;
      //   link.download = file.name;
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      //   window.URL.revokeObjectURL(url);
      // })

    }
    
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
      <div className="learning-objectives-container">
        <h3 className="learning-objectives-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Learning Objectives</b></h3>
        
        {/* Loaded Learning Objectives */}
        {learningObjectives}

        {/* Add New Learning Objective */}
        <div className="add-learning-objective text-center" style={{paddingTop: "1%"}}>
            <Button variant="success" onClick={handleOpenNewLearningObjective}>Add New</Button>
            <hr></hr>
        </div>
        {/* Create New Learning Objective Modal */}
        <Modal show={openAddObjectiveModal} onHide={handleCloseNewLearningObjective}>
          <Modal.Header closeButton>
            <Modal.Title>New Learning Objective</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form id="createLearningObjectiveForm">
              <div className="form-group">
                <label>Name of Learning Objective</label>
                <input type="text" className="form-control" id="titleInput" name="title" onChange={handleLearningObjectiveModalChange}/>
              </div>
              <div className="form-group">
                <label>Description of New Learning Objective</label>
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

      {/* Course Steps */}
      <div className="course-container">
        <h3 className="learning-objectives-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Course</b></h3>

        {/* Load Course Steps */}
        {courseSteps}

        {/* Add New Course Step */}
        <div className="add-course-step text-center" style={{paddingTop: "1%"}}>
            <Button variant="success" onClick={handleOpenNewCourseStep}>Add New</Button>
            <hr></hr>
        </div>
      </div>

      {/* Create New Course Step Modal */}
      <Modal show={openAddCourseStepModal} onHide={handleCloseNewCourseStep}>
        <Modal.Header closeButton>
          <Modal.Title>New Learning Objective</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form id="createCourseStepForm">
            <div className="form-group">
              <label>Name of Course Step</label>
              <input type="text" className="form-control" id="titleInput" name="title" onChange={handleCourseStepModalChange}/>
            </div>
            <div className="form-group">
              <label>Description of New Course Step</label>
              <MDBTextArea rows={4} className="form-control" name="description" onChange={handleCourseStepModalChange}></MDBTextArea>
            </div>
          </form>   
        </Modal.Body>
                  

        <Modal.Footer>
          <Button variant="primary" onClick={createNewCourseStepModal}>Create</Button>
          <Button variant="secondary" onClick={handleCloseNewCourseStep}>Close</Button>
        </Modal.Footer>

      </Modal>

      {/* Resources */}
      <div className="resources-container">
        <h3 className="resources-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Resources</b></h3>
        {/* Loaded Resources */}
        {resources}

        {/* Add New Resource */}
        <div className="add-resource text-center" style={{paddingTop: "1%"}}>
            <Button variant="success" onClick={handleOpenNewResource}>Add New</Button>
            <hr></hr>
        </div>
        {/* Create New Resource Modal */}
        <Modal show={openAddResourceModal} onHide={handleCloseNewResource}>
          <Modal.Header closeButton>
            <Modal.Title>New Resource</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form id="createResourceForm" onSubmit={handleFile}>
              <div className="form-group">
                <label>Name of Resource</label>
                <input type="text" className="form-control" id="titleInput" name="title" onChange={handleResourceModalChange}/>
              </div>
              <div className="form-group">
                <Dropdown onSelect={setResourceType}>
                  <Dropdown.Toggle variant="success" id="resource-type-dropdown" style={{marginTop: "2%"}}>
                    {resourceDropdownTypeName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Link">Link</Dropdown.Item>
                    <Dropdown.Item eventKey="File">File</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {resourceExtraOption}

              </div>
            </form>   
          </Modal.Body>
                  

          <Modal.Footer>
            <Button variant="primary" onClick={createNewResourceModal}>Create</Button>
            <Button variant="secondary" onClick={handleCloseNewResource}>Close</Button>
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