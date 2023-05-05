import './App.css';
import ApprovedIntakes from "./components/ApprovedIntakes";
import ArchivedIntakes from "./components/ArchivedIntakes";
import Curriculum from "./components/Curriculum";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import CurriculumDash from "./components/CurriculumDash";
import EditCurriculum from "./components/EditCurriculum";
import SubmitIntake from "./components/SubmitIntake";
import ViewIntake from "./components/ViewIntake";
import Login from "./components/Login";
import ManageAccounts from "./components/ManageAccounts";
import NeedsAssessment from "./components/NeedsAssessment";
import PendingIntake from "./components/PendingIntake";
import SuccessRate from "./components/SuccessRate";
import AdminNav from "./components/AdminNav";
import PLDashboard from './components/PLDashboard';
import ClientDashboard from './components/ClientDashboard';
import React from "react";
import { HashRouter } from 'react-router-dom';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/logout" element={<Login />}/>
        <Route exact path="/approvedIntakes" element={<ApprovedIntakes />}/>
        <Route exact path="/archivedIntakes" element={<ArchivedIntakes />}/>
        <Route exact path="/curriculum" element={<Curriculum />}/>
        <Route exact path="/dashboard" element={<Dashboard />}/>
        <Route exact path="/adminDashboard" element={<AdminDashboard />}/>
        <Route exact path="/plDashboard" element={<PLDashboard />}/>
        <Route exact path="/clientDashboard" element={<ClientDashboard />}/>
        <Route exact path="/curriculumDash" element={<CurriculumDash />}/>
        <Route exact path="/editCurriculum" element={<EditCurriculum />}/>
        <Route exact path="/submitIntake" element={<SubmitIntake />}/>
        <Route exact path="/viewIntake" element={<ViewIntake />}/>
        <Route exact path="/manageAccounts" element={<ManageAccounts />}/>
        <Route exact path="/needsAssessment" element={<NeedsAssessment />}/>
        <Route exact path="/pendingIntakes" element={<PendingIntake />}/>
        <Route exact path="/successRate" element={<SuccessRate />}/>
        <Route exact path="/adminNav" element={<AdminNav />}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
