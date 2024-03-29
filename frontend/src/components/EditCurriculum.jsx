import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav';
import ClientNav from '../components/ClientNav';
import { useNavigate } from "react-router-dom";
import { getCurriculumByIntakeId, saveCurriculum } from '../services/curriculumService';
// import { getFileByPath, uploadFiles } from '../services/curriculumService'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBTextArea } from 'mdb-react-ui-kit';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import deleteIcon from '../resources/delete-icon.png';

function EditCurriculum() {
  // const fileInput = React.createRef();
  const history = useNavigate();

  const [ adminNavbar, setAdminNavbar ] = useState(false);

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

  // Course Plan Hooks
  const [ coursePlan, setCoursePlan ] = useState("");
  const [ coursePlanHTML, setCoursePlanHTML ] = useState(<div></div>);

  // Link Hooks
  const [ curriculumLinks, setCurriculumLinks ] = useState("");
  const [ links, setLinks ] = useState(<div></div>);

  // File Hooks
  // const [ curriculumFiles, setCurriculumFiles ] = useState([]);
  // const [ files, setFiles ] = useState(<div></div>);


  useEffect(() => {
    loadLearningObjectives(curriculumLearningObjectives);
  }, [curriculumLearningObjectives]);

  // useEffect(() => {
  //   loadFiles(curriculumFiles);
  // }, [curriculumFiles])

  useEffect(() => {
    // Permissions
    const permissionLevel = localStorage.getItem("permission-level");
    if (permissionLevel === "admin") {
      setAdminNavbar(true);
    }

    // Get Curriculum using CurrentIntakeId
    getCurriculumByIntakeId(localStorage.getItem("currentIntakeId")).then((curriculum) => {
      // All works
      setCurriculumId(curriculum.data._id);
      setCurriculumTitle(`Edit ${curriculum.data.name}`);
      setCurriciulumLearningObjectives(curriculum.data.objectives);
      setCoursePlan(curriculum.data.plan);
      setCurriculumLinks(curriculum.data.links);
      loadLearningObjectives(curriculum.data.objectives);
      loadPlan(curriculum.data.plan);
      loadLinks(curriculum.data.links);
      

      // replaceFileOutputs(curriculum.data.files).then((result) => {
      //   // setCurriculumFiles(result);
      //   setTimeout(() => {
      //     setCurriculumFiles(result)
      //   }, 100)
      // });

      
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
    console.log(`name: ${name}`);
    console.log(`value: ${value}`);
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
    curriculumLearningObjectives.splice(index, 1);
    setCurriciulumLearningObjectives(curriculumLearningObjectives);
    loadLearningObjectives(curriculumLearningObjectives);
  }
  function handleLearningObjectiveModalChange(e) {
    const { value } = e.target;
    setNewLearningObjective(value);
  }

  // Curriculum Step Functions:
  const loadPlan = (plan) => {
    setCoursePlanHTML(
          <div className="container">
            <div className="row" style={{paddingTop: "1%"}}>
              <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>Description</b></h3>

              <div>
                <h6>Select the training formats needed for these learning objectives:</h6>
                <MDBCheckbox name='lecture' id='inlineCheckbox1' onChange={handleTrainingChange} defaultChecked={plan.selectedTraining.lecture} label='Lecture' inline />
                <MDBCheckbox name='handsOnSkills' id='inlineCheckbox2' onChange={handleTrainingChange} defaultChecked={plan.selectedTraining.handsOnSkills} label='Hands-on Skills' inline />
                <MDBCheckbox name='mannequinBasedSimulation' id='inlineCheckbox3' onChange={handleTrainingChange} defaultChecked={plan.selectedTraining.mannequinBasedSimulation} label='Mannequin-based Simulation' inline />
                <MDBCheckbox name='standardizedPatient' id='inlineCheckbox3' onChange={handleTrainingChange} defaultChecked={plan.selectedTraining.standardizedPatient} label='Standardized Patient' inline />
                <MDBCheckbox name='inSituTraining' id='inlineCheckbox3' onChange={handleTrainingChange} defaultChecked={plan.selectedTraining.inSituTraining} label='In-Situ Training' inline />
                <MDBCheckbox name='other' id='inlineCheckbox3' onChange={handleTrainingChange} defaultChecked={plan.selectedTraining.other} label='Other' inline />
              </div>

              <MDBTextArea style={{marginTop: "1%", marginBottom: "1%"}} rows={4} name="description" defaultValue={plan.description} onChange={handleCoursePlanResponseChange}/>
            </div>
          </div>
        
      
    )
  }
  const handleTrainingChange = (e) => {
    const { name, checked } = e.target;
    console.log(`name: ${name}, checked: ${checked}`);

    switch (name) {
      case "lecture":
        setCoursePlan((oldPlan) => {
          oldPlan.selectedTraining.lecture = checked;
          console.log(oldPlan);
          return oldPlan;
        });
        break;

      case "handsOnSkills":
        setCoursePlan((oldPlan) => {
          oldPlan.selectedTraining.handsOnSkills = checked;
          console.log(oldPlan);
          return oldPlan;
        });
        break;

      case "mannequinBasedSimulation":
        setCoursePlan((oldPlan) => {
          oldPlan.selectedTraining.mannequinBasedSimulation = checked;
          console.log(oldPlan);
          return oldPlan;
        });
        break;

      case "standardizedPatient":
        setCoursePlan((oldPlan) => {
          oldPlan.selectedTraining.standardizedPatient = checked;
          console.log(oldPlan);
          return oldPlan;
        });
        break;

      case "inSituTraining":
        setCoursePlan((oldPlan) => {
          oldPlan.selectedTraining.inSituTraining = checked;
          console.log(oldPlan);
          return oldPlan;
        });
        break;

      case "other":
        setCoursePlan((oldPlan) => {
          oldPlan.selectedTraining.other = checked;
          console.log(oldPlan);
          return oldPlan;
        });
        break;

      default:
        console.log('Something went wrong');
        break;
    }
  }
  const handleCoursePlanResponseChange = (e) => {
    const { value} = e.target;

    setCoursePlan((oldPlan) => {
      oldPlan.description = value;
      return oldPlan;
    })

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
      return oldLinks;
    });
  }
  const createNewLink = (e) => {
    const newLink = {
      title: '',
      output: ''
    }

    if (typeof curriculumLinks === 'undefined') {
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
  // const replaceFileOutputs = async (files) => {
  //   if (typeof files === 'undefined' || files === "") {
  //     return [];
  //   }
    
  //   setFiles(files.forEach((specificFile, index) => {
  //     if (typeof specificFile.output === 'string') {
  //       // Get the file from backend files directory
  //       getFileByPath(specificFile.output).then((result) => {
  //         var fileName;
  //         if (typeof specificFile.output === 'string') {
  //           const firstUnderscoreIndex = specificFile.output.indexOf('_')+1;
  //           var oneUnderscoreString = specificFile.output.substring(firstUnderscoreIndex);
  //           const secondUnderscoreIndex = oneUnderscoreString.indexOf('_')+1;
  //           fileName = oneUnderscoreString.substring(secondUnderscoreIndex);
  //         } else {
  //           fileName = specificFile.output.name;
  //         }
          
  //         const blob = new Blob([result.data], {type: result.headers['content-type']});
  //         const file = new File([blob], fileName, {type: result.headers['content-type']});

  //         files[index].output = file;

  //         setCurriculumFiles((oldFiles) => {
  //           if (typeof oldFiles === 'object') {
  //             return oldFiles;
  //           }

  //           oldFiles[index].output = file;
  //           return oldFiles;
  //         })
  //       });
        

  //     }
  //   }))

  //   return files;

  // }
  // const loadFiles = async (files) => {
  //   if (typeof files === 'undefined' || files === "") {
  //     return <div></div>
  //   }
  //   setFiles(files.map((file, index) => {

  //     return(
  //       <div className="container" key={`${file.title}${index}`}>
  //         <div className="row" style={{paddingTop: "1%"}}>
  //           {/* Resource Header [Resource #1 - Link] */}
  //           <span style={{display: "flex"}}>
  //             <h3 style={{fontFamily: 'Bitter', fontSize:'20px'}}><b>{`Attachment #${index+1}`}</b></h3>
  //             <img src={deleteIcon} alt='delete-icon' height='23px' style={{paddingLeft: "1%"}} name={`resource${index}`} onClick={deleteFile}/>
  //           </span>

  //           {/* Resource Title [Sample Link Title]*/}
  //           <MDBTextArea style={{marginTop: "1%", marginBottom: "1%"}} className="col-md-3" rows={1} name={`title${index}`} placeholder='Enter Attachment Title' defaultValue={file.title} onChange={handleFileResponseChange}/>

  //           <div>
  //             {/* For displaying this file */}
  //             <h6 style={{fontFamily: 'Bitter', fontSize:'16px'}}><b>{`Download: `}<a style={{cursor: 'pointer'}} name={index} onClick={downloadFile} className="link-primary">{file.output.name}</a></b></h6>
  //             {/* <p>{`${file.output.name}`}</p> */}

  //             {/* For editing the file */}
  //             <input type='file' className="form-control" id={`file${index}`} name={'file'} onChange={handleFileResponseChange} ref={fileInput}/>
  //           </div>


  //           {index !== files.length-1 ? <hr style={{height: "2px", marginTop: "1%"}}></hr> : null}
  //         </div>
  //       </div>
  //     )
  //   }))
  // }
  // const downloadFile = (e) => {
  //   const { name } = e.target;
  //   const index = parseInt(name);

  //   const url = window.URL.createObjectURL(curriculumFiles[index].output);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', curriculumFiles[index].output.name);
  //   document.body.appendChild(link);
  //   link.click();
  //   link.parentNode.removeChild(link);
  // }
  // const handleFileResponseChange = (e) => {
  //   const { name, value} = e.target;
  //   let indexString, index;
    
  //   setCurriculumFiles((oldFiles) => {
  //     if (name.includes("title")) {
  //       indexString = name.split("title")[1];
  //       index = parseInt(indexString);
  //       oldFiles[index].title = value;
  //     } else if (name.includes("file")) {
  //       indexString = e.target.id.split("file")[1];
  //       index = parseInt(indexString);
  //       oldFiles[index].output = e.target.files[0];
  //       loadFiles(oldFiles);
  //     } else {
  //       console.log("Something went wrong");
  //     }
      
  //     return oldFiles;
  //   });
  // }
  // const createNewFile = (e) => {
  //   const newFileResource = {
  //     title: '',
  //     output: '',
  //     _id: null
  //   }

  //   if (typeof curriculumFiles === 'undefined') {
  //     setCurriculumFiles([newFileResource]);
  //   } else {
  //     curriculumFiles.push(newFileResource);
  //     setCurriculumFiles(curriculumFiles);
  //     loadFiles(curriculumFiles);
  //   }

  // }
  // const deleteFile = (e) => {
  //   e.preventDefault();
  //   const indexString = e.target.name.split('file')[1];
  //   const index = parseInt(indexString);
  //   curriculumFiles.splice(index, 1);
  //   setCurriculumFiles(curriculumFiles);
  //   loadFiles(curriculumFiles);
  // }

  // Save Changes Button
  const saveChanges = async () => {
    // console.log(curriculumFiles);

    // const fileData = new FormData();

    // Get a list of _ids for each file
    // fileData.append('fileIds', JSON.stringify(curriculumFiles.map((file) => {
    //   return file._id;
    // })));

    // Get a list of titles for each file
    // fileData.append('fileTitles', JSON.stringify(curriculumFiles.map((file) => {
    //   return file.title;
    // })));

    // Adding all files to formdata
    // curriculumFiles.forEach((file) => {
    //   fileData.append('file', file.output, file.output.name);
    // });


    const savedData = {
      objectives: curriculumLearningObjectives,
      plan: coursePlan,
      links: curriculumLinks
      // files: curriculumFiles
    }
    saveCurriculum(curriculumId, savedData)
    // .then(() => {
    //   setTimeout(() => {
    //     uploadFiles(curriculumId, fileData);
    //   })
    // })

    history("/curriculum");
  }

  const cancel = () => {
    history('/curriculum');
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
            <Button variant="light" style={{ fontFamily: 'Bitter'}} onClick={handleOpenNewLearningObjective}>Add New</Button>
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
            <Button style={{background:'#6E9A35', fontFamily: 'Bitter'}} onClick={createNewLearningObjectiveModal}>Create</Button>
            {/* <Button variant="secondary" onClick={handleCloseNewLearningObjective}>Close</Button> */}
          </Modal.Footer>

        </Modal>
      </div>

      {/* Course Steps */}
      <div className="course-container">
        <h3 className="learning-objectives-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Course Plan</b></h3>

        {/* Load Course Steps */}
        {coursePlanHTML}

        {/* Add New Course Step */}
        {/* <div className="add-course-step text-center" style={{paddingTop: "1%"}}>
            <Button variant="success" onClick={handleOpenNewCourseStep}>Add New</Button>
            <hr></hr>
        </div> */}
      </div>

      {/* Create New Course Step Modal */}
      {/* <Modal show={openAddCourseStepModal} onHide={handleCloseNewCourseStep}>
        <Modal.Header closeButton>
          <Modal.Title>New Course Step</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form id="createCourseStepForm">
            <div className="form-group" style={{paddingTop: "1%"}}>
              <label>Description of New Course Step</label>
              <MDBTextArea rows={4} className="form-control" name="description" placeholder='Description of Course Step' onChange={handleCourseStepModalChange}></MDBTextArea>
            </div>
          </form>   
        </Modal.Body>
                  

        <Modal.Footer>
          <Button variant="primary" onClick={createNewCourseStepModal}>Create</Button>
          <Button variant="secondary" onClick={handleCloseNewCourseStep}>Close</Button>
        </Modal.Footer>

      </Modal> */}

      {/* Links */}
      <div className="links-container">
        <h3 className="links-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Links</b></h3>
        {/* Loaded Links */}
        {links}

        {/* Add New Link */}
        <div className="add-resource text-center" style={{paddingTop: "1%"}}>
          <span>
            <Button variant="light" style={{ fontFamily: 'Bitter'}} onClick={createNewLink}>New Link</Button>
          </span>
          
          <hr></hr>
        </div>
      </div>

      {/* Files */}
      <div className="attachments-container">
        {/* <h3 className="attachments-title text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "#B05139"}}><b>Attachments</b></h3> */}
        {/* Loaded Links */}
        {/* {files} */}

        {/* Add New Link */}
        <div className="add-attachments text-center" style={{paddingTop: "1%"}}>
          <span>
            {/* <Button variant="success" onClick={createNewFile}>New Attachment</Button> */}
          </span>
          
          {/* <hr></hr> */}
        </div>
      
      </div>

      {/* Save Changes Button */}
      <div className="save-changes text-center" style={{paddingTop: "1%", paddingBottom: '1%'}}>
        <Button variant="success" onClick={saveChanges} style={{marginRight: '0.5%', background:'#6E9A35', fontFamily: 'Bitter', opacity:"90%"}}>Save Changes</Button>
        <Button variant="danger" onClick={cancel} style={{marginLeft: '0.5%', fontFamily: 'Bitter', opacity:"90%"}}>Cancel</Button>
      </div>

    </div>
  )
}

export default EditCurriculum;