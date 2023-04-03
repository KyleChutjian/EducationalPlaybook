import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { useNavigate } from "react-router-dom";
import { getCurriculumByIntakeId, getFileByPath, uploadFiles, saveCurriculum } from '../services/curriculumService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBTextArea } from 'mdb-react-ui-kit';
import deleteIcon from '../resources/delete-icon.png';

function EditCurriculum() {
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
  const [newLearningObjective, setNewLearningObjective] = useState("");
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

  // Link Hooks
  const [ curriculumLinks, setCurriculumLinks ] = useState("");
  const [ links, setLinks ] = useState(<div></div>);

  // File Hooks
  const [ curriculumFiles, setCurriculumFiles ] = useState([]);
  const [ files, setFiles ] = useState(<div></div>);


  useEffect(() => {
    loadLearningObjectives(curriculumLearningObjectives);
  }, [curriculumLearningObjectives]);

  useEffect(() => {
    loadFiles(curriculumFiles);
  }, [curriculumFiles])

  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }

    // Get Curriculum using CurrentIntakeId
    getCurriculumByIntakeId(currentIntakeId).then((curriculum) => {
      // All works
      setCurriculumId(curriculum.data._id);
      setCurriculumTitle(`Edit ${curriculum.data.name}`);
      setCurriciulumLearningObjectives(curriculum.data.objectives);
      setCurriculumSteps(curriculum.data.steps);
      setCurriculumLinks(curriculum.data.links);
      loadLearningObjectives(curriculum.data.objectives);
      loadSteps(curriculum.data.steps);
      loadLinks(curriculum.data.links);
      

      replaceFileOutputs(curriculum.data.files).then((result) => {
        // setCurriculumFiles(result);
        setTimeout(() => {
          console.log(result);
          setCurriculumFiles(result)
        }, 100)
      });

      
    });
      
  }, [curriculumTitle]);

  // Curriculum Learning Objective Functions:
  const loadLearningObjectives = (objectives) => {
    if (objectives === "") {
      return <div></div>
    }
    setLearningObjectives(
      objectives.map((learningObjective, index) => {
        return(
          <div className="container" key={`${learningObjective}${index}`}>
            <div className="row" style={{paddingTop: "1%"}}>
              <span style={{display: "flex"}}>
                <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Learning Objective #${index+1}`}</b></h3>
                <img src={deleteIcon} alt='delete-icon' height='23px' style={{paddingLeft: "1%"}} name={`objective${index}`} onClick={deleteLearningObjective}/>
              </span>
              <MDBTextArea style={{marginTop: "0%", marginBottom: "1%"}} rows={4} name={`objective${index}`} defaultValue={learningObjective} onChange={handleLearningObjectivesResponseChange}/>
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
      indexString = name.split("objective")[1];
      index = parseInt(indexString);
      oldObjectives[index] = value;
      return oldObjectives;
    });
  }
  const createNewLearningObjectiveModal = (e) => {
    e.preventDefault();
    setOpenAddObjectiveModal(false);

    var newLearningObjectives = curriculumLearningObjectives;
    newLearningObjectives = newLearningObjectives.concat(newLearningObjective);

    setCurriciulumLearningObjectives(newLearningObjectives);
    loadLearningObjectives(newLearningObjectives);
  };
  const deleteLearningObjective = (e) => {
    e.preventDefault();
    const indexString = e.target.name.split('objective')[1];
    const index = parseInt(indexString);
    console.log(e.target.name);
    console.log(curriculumLearningObjectives)
    curriculumLearningObjectives.splice(index, 1);
    console.log(curriculumLearningObjectives)
    setCurriciulumLearningObjectives(curriculumLearningObjectives);
    loadLearningObjectives(curriculumLearningObjectives);
  }
  function handleLearningObjectiveModalChange(e) {
    const { value } = e.target;
    setNewLearningObjective(value);
  }

  // Curriculum Step Functions:
  const loadSteps = (steps) => {
    setCourseSteps(
      steps.map((step, index) => {
        return(
          <div className="container" key={step[0]}>
            <div className="row" style={{paddingTop: "1%"}}>
              <span style={{display: "flex"}}>
                <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Course Step #${index+1}`}</b></h3>
                <img src={deleteIcon} alt='delete-icon' height='23px' style={{paddingLeft: "1%"}} name={`step${index}`} onClick={deleteCourseStep}/>
              </span>
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
  const deleteCourseStep = (e) => {
    e.preventDefault();
    const indexString = e.target.name.split('step')[1];
    const index = parseInt(indexString);
    curriculumSteps.splice(index, 1);
    setCurriculumSteps(curriculumSteps);
    loadSteps(curriculumSteps);
  }

  function handleCourseStepModalChange(e) {
    const { name, value } = e.target;

    setNewCourseStep((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  // Curriculum Link Functions:
  const loadLinks = async (links) => {
    if (typeof links === 'undefined' || links === "") {
      return <div></div>
    }

    setLinks(links.map((link, index) => {
      return(
        <div className="container" key={`${link.title}${index}`}>
          <div className="row" style={{paddingTop: "1%"}}>
            {/* Resource Header [Resource #1 - Link] */}
            <span style={{display: "flex"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Link #${index+1}`}</b></h3>
              <img src={deleteIcon} alt='delete-icon' height='23px' style={{paddingLeft: "1%"}} name={`link${index}`} onClick={deleteLink}/>
            </span>

            {/* Link Title */}
            <MDBTextArea style={{marginTop: "1%", marginBottom: "1%"}} className="col-md-3" rows={1} name={`title${index}`} placeholder='Enter Name of Link' defaultValue={link.title} onChange={handleLinkResponseChange}/>

            {/* Link Output */}
            <MDBTextArea className="col-md-3" rows={1} name={`output${index}`} placeholder='Enter Link' defaultValue={link.output} onChange={handleLinkResponseChange}/>

            {index !== links.length-1 ? <hr style={{height: "2px", marginTop: "1%"}}></hr> : null}
          </div>
        </div>
      )
    }));
  }
  const handleLinkResponseChange = (e) => {
    const { name, value} = e.target;
    let indexString, index;
    
    setCurriculumLinks((oldLinks) => {
      if (name.includes("title")) {
        indexString = name.split("title")[1];
        index = parseInt(indexString);
        oldLinks[index].title = value;
      } else if (name.includes("output")) {
        indexString = name.split("output")[1];
        index = parseInt(indexString);
        
        oldLinks[index].output = value;
      } else {
        console.log("Something went wrong");
      }
      console.log(oldLinks);
      return oldLinks;
    });
  }
  const createNewLink = (e) => {
    const newLink = {
      title: '',
      output: ''
    }

    if (typeof curriculumLinks === 'undefined') {
      console.log("only resource");
      setCurriculumLinks([newLink]);
    } else {
      curriculumLinks.push(newLink);
      setCurriculumLinks(curriculumLinks);
      loadLinks(curriculumLinks);
    }

  }
  const deleteLink = (e) => {
    e.preventDefault();
    const indexString = e.target.name.split('link')[1];
    const index = parseInt(indexString);
    curriculumLinks.splice(index, 1);
    setCurriculumLinks(curriculumLinks);
    loadLinks(curriculumLinks);
  }

  // Curriculum File Functions:
  const replaceFileOutputs = async (files) => {
    if (typeof files === 'undefined' || files === "") {
      return [];
    }
    
    setFiles(files.forEach((specificFile, index) => {
      if (typeof specificFile.output === 'string') {
        // Get the file from backend files directory
        console.log(specificFile.output);
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
    // if (files === "") {
    //   return [];
    // }
    return files;

  }

  const loadFiles = async (files) => {
    if (typeof files === 'undefined' || files === "") {
      return <div></div>
    }
    setFiles(files.map((file, index) => {

      return(
        <div className="container" key={`${file.title}${index}`}>
          <div className="row" style={{paddingTop: "1%"}}>
            {/* Resource Header [Resource #1 - Link] */}
            <span style={{display: "flex"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Attachment #${index+1}`}</b></h3>
              <img src={deleteIcon} alt='delete-icon' height='23px' style={{paddingLeft: "1%"}} name={`resource${index}`} onClick={deleteFile}/>
            </span>

            {/* Resource Title [Sample Link Title]*/}
            <MDBTextArea style={{marginTop: "1%", marginBottom: "1%"}} className="col-md-3" rows={1} name={`title${index}`} placeholder='Enter Attachment Title' defaultValue={file.title} onChange={handleFileResponseChange}/>

            <div>
              {/* For displaying this file */}
              <p>{`File name for displaying the file later: ${file.output.name}`}</p>

              {/* For editing the file */}
              <input type='file' className="form-control" id={`file${index}`} name={'file'} onChange={handleFileResponseChange} ref={fileInput}/>
            </div>


            {index !== files.length-1 ? <hr style={{height: "2px", marginTop: "1%"}}></hr> : null}
          </div>
        </div>
      )
    }))
  }

  const handleFileResponseChange = (e) => {
    const { name, value} = e.target;
    let indexString, index;
    
    setCurriculumFiles((oldFiles) => {
      if (name.includes("title")) {
        indexString = name.split("title")[1];
        index = parseInt(indexString);
        oldFiles[index].title = value;
      } else if (name.includes("file")) {
        indexString = e.target.id.split("file")[1];
        index = parseInt(indexString);
        oldFiles[index].output = e.target.files[0];
        loadFiles(oldFiles);
      } else {
        console.log("Something went wrong");
      }
      
      return oldFiles;
    });
  }
  const createNewFile = (e) => {
    const newFileResource = {
      title: '',
      output: '',
      _id: null
    }

    if (typeof curriculumFiles === 'undefined') {
      console.log("only resource");
      setCurriculumFiles([newFileResource]);
    } else {
      curriculumFiles.push(newFileResource);
      setCurriculumFiles(curriculumFiles);
      loadFiles(curriculumFiles);
    }

  }
  const deleteFile = (e) => {
    e.preventDefault();
    const indexString = e.target.name.split('file')[1];
    const index = parseInt(indexString);
    curriculumFiles.splice(index, 1);
    setCurriculumFiles(curriculumFiles);
    loadFiles(curriculumFiles);
  }

  // Save Changes Button
  const saveChanges = async () => {
    console.log(curriculumLinks);
    console.log(curriculumFiles);

    const fileData = new FormData();

    // Get a list of _ids for each file
    fileData.append('fileIds', JSON.stringify(curriculumFiles.map((file) => {
      return file._id;
    })));

    // Get a list of titles for each file
    fileData.append('fileTitles', JSON.stringify(curriculumFiles.map((file) => {
      return file.title;
    })));

    // Adding all files to formdata
    curriculumFiles.forEach((file) => {
      fileData.append('file', file.output, file.output.name);
    });


    const savedData = {
      objectives: curriculumLearningObjectives,
      steps: curriculumSteps,
      links: curriculumLinks
      // files: curriculumFiles
    }
    saveCurriculum(curriculumId, savedData).then(() => {
      setTimeout(() => {
        uploadFiles(curriculumId, fileData);
      })
    })


    // await saveCurriculum(curriculumId, savedData).then(async () => {
    //   setTimeout(async () => {
    //     // await uploadFiles(curriculumId, fileData);
    //   }, 100)
      
    // })
    
    

    // history("/curriculum");
  }

  return(
    <div>
      <div>
        {adminNavbar ? <AdminNav/> : <ClientNav/>}
      </div>

      {/* Jumbotron */}
      <div className='p-5 text-center' style={{background: '#d2492a', color:'whitesmoke'}}>
        <h1 style={{fontFamily: 'Bitter'}}>{curriculumTitle}</h1>
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
              <div className="form-group" style={{paddingTop: "1%"}}>
                <MDBTextArea rows={4} className="form-control" name="description" placeholder='Description of Learning Objective' onChange={handleLearningObjectiveModalChange}></MDBTextArea>
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
          <Modal.Title>New Course Step</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form id="createCourseStepForm">
            <div className="form-group">
              {/* <label>Name of Course Step</label> */}
              <input type="text" className="form-control" id="titleInput" name="title" placeholder='Name of Course Step' onChange={handleCourseStepModalChange}/>
            </div>
            <div className="form-group" style={{paddingTop: "1%"}}>
              {/* <label>Description of New Course Step</label> */}
              <MDBTextArea rows={4} className="form-control" name="description" placeholder='Description of Course Step' onChange={handleCourseStepModalChange}></MDBTextArea>
            </div>
          </form>   
        </Modal.Body>
                  

        <Modal.Footer>
          <Button variant="primary" onClick={createNewCourseStepModal}>Create</Button>
          <Button variant="secondary" onClick={handleCloseNewCourseStep}>Close</Button>
        </Modal.Footer>

      </Modal>

      {/* Links */}
      <div className="links-container">
        <h3 className="links-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Links</b></h3>
        {/* Loaded Links */}
        {links}

        {/* Add New Link */}
        <div className="add-resource text-center" style={{paddingTop: "1%"}}>
          <span>
            <Button variant="success" onClick={createNewLink}>New Link</Button>
          </span>
          
          <hr></hr>
        </div>
      </div>

      {/* Files */}
      <div className="attachments-container">
        <h3 className="attachments-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Attachments</b></h3>
        {/* Loaded Links */}
        {files}

        {/* Add New Link */}
        <div className="add-attachments text-center" style={{paddingTop: "1%"}}>
          <span>
            <Button variant="success" onClick={createNewFile}>New Attachment</Button>
          </span>
          
          <hr></hr>
        </div>
      
      </div>

      {/* Save Changes Button */}
      <div className="save-changes text-center" style={{paddingTop: "1%"}}>
        <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
      </div>

    </div>
  )
}

export default EditCurriculum;