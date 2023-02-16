import http from "./httpService";
import { getJwt } from "./authService";

const apiEndPointIntake = "http://localhost:3001/intake";

// Get All Intake Forms
export function getAllIntakes() {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}`);
}

// Get Intake Forms by Status
export function getIntakesByStatus(status) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/get-intakes/${status}`);
}

// Get Intake By IntakeId
export function getIntakeByIntakeId(intakeId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/get-intake/${intakeId}`);
}

// Get Open Intake by ClientId
export function getClientIntakeByClientId(clientId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/get-intake-by-clientid/${clientId.clientId}`);
}


// Save Unsubmitted Intake Form
export function saveIntake(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/save-intake`, data);
}

// Submit Intake Form
export function submitIntake(data) {
    http.setJwt(getJwt());
    localStorage.setItem("intakeId", null)
    return http.put(`${apiEndPointIntake}/submit-intake`, data);
}

// Admin Approve Submitted Intake Form
export function adminApproveIntake(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/approve-intake/admin`, data);
}

// Program-Lead Approve Submitted Intake Form
export function programleadApproveIntake(data) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/approve-intake/programlead`, data);
}

// Archive Intake by IntakeId
export function archiveIntakebyIntakeId(intakeId) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/archive-intake/${intakeId}`);
}

// Edit Intake Form by IntakeId
export function editIntakeByIntakeId(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/edit-intake`, data);
}

// Delete Intake Form by IntakeId
export function deleteIntakeByIntakeId(intakeId) {
    http.setJwt(getJwt());
    return http.delete(`${apiEndPointIntake}/${intakeId}`);
}

// Get Intake Data by IntakeId
export function getIntakeDataByIntakeId(data) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/view-intake`, data);
}

// Edit Intake Status by IntakeID
export function editIntakeStatusByIntakeId(intakeId, status) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/${intakeId}/edit-intake-status/${status}`);
}

// Get Needs Assessment by IntakeId
export function getNeedsAssessmentByIntakeId(intakeId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/${intakeId}/view-needsAssessment`);
}

// Edit Needs Assessment by IntakeId
export function editNeedsAssessmentByIntakeId(intakeId, data) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/${intakeId}/edit-needsAssessment`, data);
}

// Get Intakes by ClientId by Status
export function getIntakesByClientIdByStatus(clientId, status) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/client/${clientId}/${status}`);
}

// Get Intakes By ProgramLeadId By Status
export function getIntakesByProgramLeadIdByStatus(programLeadId, status) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/programlead/${programLeadId}/${status}`);
}