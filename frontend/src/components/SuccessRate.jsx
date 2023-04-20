import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNav from '../components/AdminNav';
import { getAllArchivedIntakes } from '../services/intakeService';
import { getCurrentUser } from '../services/authService';

function SuccessRate() {
  const history = useNavigate();

  const [ archivedIntakes, setArchivedIntakes ] = useState([]);
  const [ archivedSuccess, setArchivedSuccess ] = useState([]);
  const [ archivedFail, setArchivedFail ] = useState([]);
  const [ archivedDeny, setArchivedDeny ] = useState([]);
  const [ successRate, setSuccessRate ] = useState(0);

  useEffect(() => {
    const currentUser = getCurrentUser();
    const permissionLevel = localStorage.getItem("permission-level");
    if (!currentUser.isAdmin) {
      if (permissionLevel === "projectlead") {
        history("/pldashboard");
      } else if (permissionLevel === "client") {
        history("/clientdashboard");
      }
    }

    getAllArchivedIntakes().then((intakes) => {
      setArchivedIntakes(intakes.data);
      const success = intakes.data.filter((intake) => {
        return intake.status === "archived-success";
      })
      const fail = intakes.data.filter((intake) => {
        return intake.status === "archived-fail";
      });
      const deny = intakes.data.filter((intake) => {
        return intake.status === "archived-denied";
      });

      setArchivedSuccess(success);
      setArchivedDeny(deny);
      setArchivedFail(fail);
      const successRate = (success.length / intakes.data.length)*100;
      setSuccessRate(successRate.toFixed(2));
    })
  }, []);

  return(
    <div>
      <div>
        <AdminNav/>
      </div>

      {/* Jumbotron */}
      <div className='p-5 text-center' style={{background: '#a40084', color:'whitesmoke'}}>
        <h1 style={{fontFamily: 'Bitter'}}>Success Rate</h1>
      </div>

      {/* Statistics */}
      <div>
        <h1 className='text-center' style={{fontFamily: 'Bitter', color: '#a40084'}}>{`${successRate}%`}</h1>

        <h3 className="text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "green"}}><b>{
          `${archivedSuccess.length}/${archivedIntakes.length} curriculums were successful`
        }</b></h3>

        <h3 className="text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "red"}}><b>{
          `${archivedFail.length}/${archivedIntakes.length} curriculums were unsuccessful`
        }</b></h3>

        <h3 className="text-center" style={{fontFamily: 'Bitter', paddingTop: "1%", color: "red"}}><b>{archivedDeny.length === 1 ?
          `${archivedDeny.length} intake form was denied` : `${archivedDeny.length} intake forms were denied`
        }</b></h3>
      </div>
      
      {/* Displaying Archived Intakes */}
      <div style={{backgroundColor: 'lightgray'}}>

      </div>

    </div>
  )
}

export default SuccessRate;