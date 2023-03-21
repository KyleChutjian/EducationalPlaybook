import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import EditCurriculum from './EditCurriculum';
import { useNavigate } from "react-router-dom";
import { getCurriculumByIntakeId, getCurriculumByCurriculumId } from '../services/curriculumService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBTextArea } from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';

function Curriculum() {
  // TEMPORARY, when Sadjell is done this will be removed
  // localStorage.setItem("currentIntakeId", "64001af5f037081c00fb95b4"); 


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
 // const [openAddObjectiveModal, setOpenAddObjectiveModal] = useState(false);
 // const handleOpenNewLearningObjective = () => setOpenAddObjectiveModal(true);
 // const handleCloseNewLearningObjective = () => setOpenAddObjectiveModal(false);

  // Step Hooks
  const [ curriculumSteps, setCurriculumSteps ] = useState("");
  const [ courseSteps, setCourseSteps ] = useState(<div></div>);
 // const [ openAddCourseStepModal, setOpenAddCourseStepModal ] = useState(false);
 // const handleOpenNewCourseStep = () => setOpenAddCourseStepModal(true);
 // const handleCloseNewCourseStep = () => setOpenAddCourseStepModal(false);

  // Resource Hooks
  const [ curriculumResources, setCurriculumResources ] = useState("");
  const [ resources, setResources ] = useState(<div></div>);
  const [ resourceExtraOption, setResourceExtraOption ] = useState(<div></div>);
 // const [ openAddResourceModal, setOpenAddResourceModal ] = useState(false);
 // const [ resourceDropdownTypeName, setResourceDropdownTypeName ] = useState("Type of Resource");
 // const handleCloseNewResource = () => setOpenAddResourceModal(false);

  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }

    // Get Curriculum using CurrentIntakeId
    getCurriculumByIntakeId(currentIntakeId).then((curriculum) => {
      setCurriculumId(curriculum.data._id);
      setCurriculumTitle(`Curriculum Development Plan: ${curriculum.data.name}`);
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
              <MDBTextArea readonly className="col-md-3" rows={1} name={`title${index}`} defaultValue={learningObjective[0]} />
              <MDBTextArea readonly style={{marginTop: "1%", marginBottom: "1%"}} rows={4} name={`description${index}`} defaultValue={learningObjective[1]}/>
              {index !== objectives.length-1 ? <hr style={{height: "2px"}}></hr> : null}
            </div>
          </div>
        )
      }
    ))
  }
  // const handleLearningObjectivesResponseChange = (e) => {
  //   const { name, value} = e.target;
  //   let indexString, index;
  //   setCurriciulumLearningObjectives((oldObjectives) => {
  //     if (name.includes("title")) {
  //       indexString = name.split("title")[1];
  //       index = parseInt(indexString);
  //       oldObjectives[index][0] = value;
  //     } else if (name.includes("description")) {
  //       indexString = name.split("description")[1];
  //       index = parseInt(indexString);
        
  //       oldObjectives[index][1] = value;
  //     } else {
  //       console.log("Something went wrong");
  //     }
  //     return oldObjectives;
  //   });
  // }
  // const createNewLearningObjectiveModal = (e) => {
  //   e.preventDefault();
  //   setOpenAddObjectiveModal(false);
    
  //   const newLearningObjectiveArray = [newLearningObjective.title, newLearningObjective.description];
  //   curriculumLearningObjectives.push(newLearningObjectiveArray);
  //   loadLearningObjectives(curriculumLearningObjectives)
  // };
  // function handleLearningObjectiveModalChange(e) {
  //   const { name, value } = e.target;

  //   setNewLearningObjective((old) => {
  //     return {
  //       ...old,
  //       [name]: value,
  //     };
  //   });
  // }

  // Curriculum Step Functions:
  const loadSteps = (steps) => {
    setCourseSteps(
      steps.map((step, index) => {
        return(
          <div className="container" key={step[0]}>
            <div className="row" style={{paddingTop: "1%"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Course Step #${index+1}`}</b></h3>
              <MDBTextArea readonly className="col-md-3" rows={1} name={`title${index}`} defaultValue={step[0]} />
              <MDBTextArea readonly style={{marginTop: "1%", marginBottom: "1%"}} rows={4} name={`description${index}`} defaultValue={step[1]} />
              {index !== steps.length-1 ? <hr style={{height: "2px"}}></hr> : null}
            </div>
          </div>
        )
      }
    ))
  }
  // const handleCourseStepsResponseChange = (e) => {
  //   const { name, value} = e.target;
  //   let indexString, index;

  //   setCurriculumSteps((oldSteps) => {
  //     if (name.includes("title")) {
  //       indexString = name.split("title")[1];
  //       index = parseInt(indexString);
  //       oldSteps[index][0] = value;
  //     } else if (name.includes("description")) {
  //       indexString = name.split("description")[1];
  //       index = parseInt(indexString);
        
  //       oldSteps[index][1] = value;
  //     } else {
  //       console.log("Something went wrong");
  //     }
  //     return oldSteps;
  //   });
  // }
  // const createNewCourseStepModal = (e) => {
  //   e.preventDefault();
  //   setOpenAddCourseStepModal(false);
  //   const newCourseStepArray = [newCourseStep.title, newCourseStep.description];
  //   curriculumSteps.push(newCourseStepArray);
  //   loadSteps(curriculumSteps);
  // };
  // function handleCourseStepModalChange(e) {
  //   const { name, value } = e.target;

  //   setNewCourseStep((old) => {
  //     return {
  //       ...old,
  //       [name]: value,
  //     };
  //   });
  // }

  // Curriculum Resource Functions:
  const loadResourceOutput = (type, output, index) => {
    if (type === "Link") {
      return <MDBTextArea readonly className="col-md-3" rows={1} name={`output${index}`} defaultValue={output} />
    } else if (type === "File") {
      console.log(output);
      return <div>
        <h3 style={{fontFamily: 'Bitter', fontSize:'16px', marginTop: "1%"}}>{`Replace \"${output.name}\":`}</h3>
        <input readonly type='file' className="form-control" id="fileInput" name={`file${index}`} ref={fileInput}/>
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
              <MDBTextArea readonly style={{marginTop: "1%", marginBottom: "1%"}} className="col-md-3" rows={1} name={`title${index}`} defaultValue={resource[0]}/>

              {/* Resource Output [https://google.com]*/}
              {loadResourceOutput(resource[1], resource[2], index)}

              {index !== resources.length-1 ? <hr style={{height: "2px", marginTop: "1%"}}></hr> : null}
            </div>
          </div>
        )
      }
    ))
  }

  // const handleResourceResponseChange = (e) => {
  //   const { name, value} = e.target;
  //   let indexString, index;
    
  //   setCurriculumResources((oldResources) => {
  //     if (name.includes("title")) {
  //       indexString = name.split("title")[1];
  //       index = parseInt(indexString);
  //       oldResources[index][0] = value;
  //     } else if (name.includes("output")) {
  //       indexString = name.split("output")[1];
  //       index = parseInt(indexString);
        
  //       oldResources[index][2] = value;
  //     } else if (name.includes("file")) {
  //       console.log(`name: ${name}`);
  //       indexString = name.split("file")[1];
  //       index = parseInt(indexString);
  //       oldResources[index][2] = e.target.files[0];
  //     } else {
  //       console.log("Something went wrong");
  //     }
  //     return oldResources;
  //   });
  // }
  
 

  // Save Changes Button
  // const saveChanges = () => {
  //   console.log(curriculumLearningObjectives)
  //   console.log(curriculumSteps);
  //   console.log(curriculumResources);
  //   console.log(curriculumResources[1][2])
  // }

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

    }
    
  }

  return(
    <div>
      <div>
        {adminNavbar ? <AdminNav/> : <ClientNav/>}
      </div>

      {/* Jumbotron */}
      <div className='p-5 text-center' style={{backgroundColor: '#d2492a', color:'whitesmoke'}}>
        <h1 className='mb-3' style={{fontFamily: 'Bitter'}}>{curriculumTitle}</h1>
      </div>

      {/* Learning Objectives */}
      <div className="learning-objectives-container">
        <h3 className="learning-objectives-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Learning Objectives</b></h3>
        
        {/* Loaded Learning Objectives */}
        {learningObjectives}

        {/* Add New Learning Objective */}
        <div className="add-learning-objective text-center" style={{paddingTop: "1%"}}>
           
            <hr></hr>
        </div>
      </div>

      {/* Course Steps */}
      <div className="course-container">
        <h3 className="learning-objectives-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Course</b></h3>

        {/* Load Course Steps */}
        {courseSteps}

        <hr></hr>
      </div>

      {/* Resources */}
      <div className="resources-container">
        <h3 className="resources-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Resources</b></h3>
        {/* Loaded Resources */}
        {resources}
        <hr></hr>
      </div>


    </div>
  )
}

export default Curriculum;