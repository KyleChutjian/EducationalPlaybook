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
import editIcon from '../resources/edit-icon.png';

function Curriculum() {
  const fileInput = React.createRef();
  const history = useNavigate();

  const [ permissionLevel, setPermissionLevel ] = useState("client");
  const [ adminNavbar, setAdminNavbar ] = useState(false);
  const [ currentIntakeId, setCurrentIntakeId] = useState(localStorage.getItem("currentIntakeId"));

  // Curriculum Hooks
  const [ curriculumId, setCurriculumId ] = useState("");
  const [ curriculumTitle, setCurriculumTitle ] = useState("");

  // Learning Objective Hooks
  const [ curriculumLearningObjectives, setCurriciulumLearningObjectives ] = useState("");
  const [ learningObjectives, setLearningObjectives ] = useState(<div></div>);

  // Step Hooks
  const [ curriculumSteps, setCurriculumSteps ] = useState("");
  const [ courseSteps, setCourseSteps ] = useState(<div></div>);

  // Resource Hooks
  const [ curriculumResources, setCurriculumResources ] = useState("");
  const [ resources, setResources ] = useState(<div></div>);
  const [ resourceExtraOption, setResourceExtraOption ] = useState(<div></div>);

  useEffect(() => {
    // Permissions
    // const permissionLevel = localStorage.getItem("permission-level");

    setPermissionLevel(localStorage.getItem("permission-level"));
    if (localStorage.getItem("permission-level") === "admin") {
      setAdminNavbar(true);
    }

    // Get Curriculum using CurrentIntakeId
    getCurriculumByIntakeId(currentIntakeId).then((curriculum) => {
      setCurriculumId(curriculum.data._id);
      setCurriculumTitle(curriculum.data.name);
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
          <div className="container" key={`learningObjective${index}`}>
            <div className="row" style={{paddingTop: "1%"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Learning Objective #${index+1}`}</b></h3>
              {/* <MDBTextArea readonly style={{marginTop: "1%", marginBottom: "1%"}} rows={4} name={`objective${index}`} defaultValue={learningObjective}/> */}
              <p className='col-md-12' name={`objective${index}`} style={{border: '1px solid black', minHeight:'50px', marginTop: '1%', marginBottom: '1%'}}>{learningObjective}</p>
              {/* {index !== objectives.length-1 ? <hr style={{height: "2px"}}></hr> : null} */}
            </div>
          </div>
        )
      }
    ))
  }

  // Curriculum Step Functions:
  const loadSteps = (steps) => {
    setCourseSteps(
      steps.map((step, index) => {
        return(
          <div className="container" key={`${step[0]}${index}`}>
            <div className="row" style={{paddingTop: "1%"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Course Step #${index+1}`}</b></h3>
              {/* <MDBTextArea readonly className="col-md-3" rows={1} name={`title${index}`} defaultValue={step[0]} /> */}
              <p className='col-md-12' name={`title${index}`} style={{border: '1px solid black', minHeight:'30px', marginTop: '1%', marginBottom: '1%'}}>{step[0]}</p>
              {/* <MDBTextArea readonly style={{marginTop: "1%", marginBottom: "1%"}} rows={4} name={`description${index}`} defaultValue={step[1]} /> */}
              <p className='col-md-12' name={`description${index}`} style={{border: '1px solid black', minHeight:'100px', marginTop: '1%', marginBottom: '1%'}}>{step[1]}</p>
              {/* {index !== steps.length-1 ? <hr style={{height: "2px"}}></hr> : null} */}
            </div>
          </div>
        )
      }
    ))
  }

  // Curriculum Resource Functions:
  const loadResourceOutput = (type, output, index) => {
    if (type === "Link") {
      // return <MDBTextArea readonly className="col-md-3" rows={1} name={`output${index}`} defaultValue={output} />
      // return <p className='col-md-12' name={`output${index}`} style={{border: '1px solid black', minHeight:'30px', marginTop: '1%', marginBottom: '1%'}}>{output}</p>
      return null;
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
          <div className="container" key={`${resource[0]}${index}`}>
            <div className="row" style={{paddingTop: "1%"}}>
              {
                resource[1] === 'Link' ? 
                <span style={{display: 'flex'}}>
                  <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Resource #${index+1}: `}<a href={resource[2]} className="link-primary">{resource[0]}</a></b></h3>
                </span> : loadResourceOutput(resource[2], index)
                
              }


              {index !== resources.length-1 ? <hr style={{height: "2px", marginTop: "1%"}}></hr> : null}
            </div>
          </div>
        )
      }
    ))
  }

  const editCurriculum = () => {
    history("/editcurriculum");
  }

  return(
    <div>
      <div>
        {adminNavbar ? <AdminNav/> : <ClientNav/>}
      </div>

      {/* Jumbotron */}
      <div className="jumbotron" style={{backgroundColor: '#d2492a', color:'whitesmoke'}}>
        <div className="container">
          <div className="row">
            <span className='p-5' style={{display: 'flex', justifyContent: 'center'}}>
              <h1 style={{fontFamily: 'Bitter', verticalAlign: 'middle', borderBottom: '0', margin: '0%'}}>{curriculumTitle}</h1>
              {/* Edit Button */}
              {
                permissionLevel ==='admin' || permissionLevel === 'projectlead' ?
                <button style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '1%', paddingBottom: '0%'}}>
                  <img src={editIcon} alt='edit-icon' height='25px' onClick={editCurriculum}/>
                </button> : null
              }
            </span>
          </div>
        </div>
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