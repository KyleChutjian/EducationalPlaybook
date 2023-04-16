import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { useNavigate } from "react-router-dom";
import { getCurriculumByIntakeId } from '../services/curriculumService';
import Button from 'react-bootstrap/Button';
import editIcon from '../resources/edit-icon.png';
import { getFileByPath } from '../services/curriculumService';
import { MDBCheckbox } from 'mdb-react-ui-kit';

function Curriculum() {
  const history = useNavigate();

  const [ permissionLevel, setPermissionLevel ] = useState("client");
  const [ adminNavbar, setAdminNavbar ] = useState(false);

  const [ curriculumTitle, setCurriculumTitle ] = useState("");
  const [ learningObjectives, setLearningObjectives ] = useState(<div></div>);
  const [ coursePlan, setCoursePlan ] = useState(<div></div>);
  const [ links, setLinks ] = useState(<div></div>);
  const [ curriculumFiles, setCurriculumFiles ] = useState([]);
  const [ files, setFiles ] = useState(<div></div>);

  useEffect(() => {
    setPermissionLevel(localStorage.getItem("permission-level"));
    if (localStorage.getItem("permission-level") === "admin") {
      setAdminNavbar(true);
    }

    // Get Curriculum using CurrentIntakeId
    getCurriculumByIntakeId(localStorage.getItem("currentIntakeId")).then((curriculum) => {
      setCurriculumTitle(curriculum.data.name);
      // setCurriculumFiles(curriculum.data.files);
      loadLearningObjectives(curriculum.data.objectives);
      loadPlan(curriculum.data.plan);
      loadLinks(curriculum.data.links);

      replaceFileOutputs(curriculum.data.files).then((result) => {
        setTimeout(() => {
          loadFiles(result)
        }, 400)
      });

    });

      
  }, [curriculumTitle]);

  // Curriculum Learning Objective Functions:
  const loadLearningObjectives = (objectives) => {
    setLearningObjectives(
      objectives.map((learningObjective, index) => {
        return(
          <div className="container" key={`learningObjective${index}`}>
            <div className="row" style={{paddingTop: "1%"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Learning Objective #${index+1}`}</b></h3>
              <p className='col-md-12' name={`objective${index}`} style={{wordWrap:"break-word", border: '1px solid black', minHeight:'50px', marginTop: '1%', marginBottom: '1%'}}>{learningObjective}</p>
            </div>
          </div>
        )
      }
    ))
  }

  // Curriculum Step Functions:
  const loadPlan = (plan) => {
    const selectedTrainingArray = [];
    if (plan.selectedTraining.lecture) {
      selectedTrainingArray.push("Lecture");
    }
    if (plan.selectedTraining.handsOnSkills) {
      selectedTrainingArray.push("Hands-on Skills");
    }
    if (plan.selectedTraining.mannequinBasedSimulation) {
      selectedTrainingArray.push("Mannequin-based Simulation");
    }
    if (plan.selectedTraining.standardizedPatient) {
      selectedTrainingArray.push("Standardized Patient");
    }
    if (plan.selectedTraining.inSituTraining) {
      selectedTrainingArray.push("In-Situ Training");
    }
    if (plan.selectedTraining.other) {
      selectedTrainingArray.push("Other");
    }
    var selectedTrainingString;
    if (selectedTrainingArray.length === 0) {
      selectedTrainingString = "N/A";
    } else {
      selectedTrainingString = selectedTrainingArray.join(', ');
    }
    setCoursePlan(
          <div className="container">
            <div className="row" style={{paddingTop: "1%"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Description</b></h3>
              <div>
                <h6>{`Training Format(s): ${selectedTrainingString}`}</h6>
              </div>
              <p className='col-md-12' style={{whiteSpace: 'pre-wrap', wordWrap:'break-word', border: '1px solid black', minHeight:'100px', marginTop: '1%', marginBottom: '1%'}}>{`${plan.description}`}</p>
            </div>
          </div>
    )
  }

  // Curriculum File Functions:
  const replaceFileOutputs = async (files) => {
    if (typeof files === 'undefined' || files === "") {
      return [];
    }
    
    setFiles(files.forEach((specificFile, index) => {
      if (typeof specificFile.output === 'string') {
        // Get the file from backend files directory
        getFileByPath(specificFile.output).then((result) => {
          var fileName;
          if (typeof specificFile.output === 'string') {
            const firstUnderscoreIndex = specificFile.output.indexOf('_')+1;
            var oneUnderscoreString = specificFile.output.substring(firstUnderscoreIndex);
            const secondUnderscoreIndex = oneUnderscoreString.indexOf('_')+1;
            fileName = oneUnderscoreString.substring(secondUnderscoreIndex);
          } else {
            fileName = specificFile.output.name;
          }
          
          const blob = new Blob([result.data], {type: result.headers['content-type']});
          const file = new File([blob], fileName, {type: result.headers['content-type']});

          files[index].output = file;

          setCurriculumFiles((oldFiles) => {
            if (typeof oldFiles === 'object') {
              return oldFiles;
            }

            oldFiles[index].output = file;
            return oldFiles;
          })
        });
        

      }
    }))

    return files;

  }

  //change to links and files
  const loadLinks = (links) => {
    if (typeof links === 'undefined') {
      return <div></div>
    }
    setLinks(
      links.map((link, index) => {
        return(
          <div className="container" key={`${link[0]}${index}`}>
            <div className="row" style={{paddingTop: "1%"}}>
                <span style={{display: 'flex'}}>
                  <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Link #${index+1}: `}<a href={`//${link.output}`} target='_blank' className="link-primary">{link.title}</a></b></h3>
                </span> 
            </div>
          </div>
        )
      }
    ))
  }

  const handleFileClick = (e) => {
    const { name } = e.target;

    const indexString = name.split("file")[1];
    const index = parseInt(indexString);

    const url = window.URL.createObjectURL(curriculumFiles[index].output);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', curriculumFiles[index].output.name);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

  }

  const loadFiles = (files) => {
    if (typeof files === 'undefined') {
      return <div></div>
    }
    setFiles(
      files.map((file, index) => {
        return(
          <div className="container" key={`${file[0]}${index}`}>
            <div className="row" style={{paddingTop: "1%"}}>
              <h6 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Download: `}<a style={{cursor: 'pointer'}} name={`file${index}`} onClick={handleFileClick} className="link-primary">{file.output.name}</a></b></h6>
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
              <button style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '1%', paddingBottom: '0%'}}>
                  <img src={editIcon} alt='edit-icon' height='25px' onClick={editCurriculum}/>
                </button>
              {/* Edit Button */}
              {/* {
                permissionLevel ==='admin' || permissionLevel === 'projectlead' ?
                <button style={{border: 'none', backgroundColor: 'inherit', paddingLeft: '1%', paddingBottom: '0%'}}>
                  <img src={editIcon} alt='edit-icon' height='25px' onClick={editCurriculum}/>
                </button> : null
              } */}
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
        <h3 className="learning-objectives-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Course Plan</b></h3>

        {/* Load Course Steps */}
        {coursePlan}

        <hr></hr>
      </div>

      {/* Links */}
      <div className="links-container">
        <h3 className="links-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Links</b></h3>
        {/* Loaded Links */}
        {links}
        <hr></hr>
      </div>

       {/* Files */}
       <div className="files-container">
        <h3 className="files-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Attachments</b></h3>
        {/* Loaded Files */}
        {files}
        <hr></hr>
      </div>


    </div>
  )
}

export default Curriculum;