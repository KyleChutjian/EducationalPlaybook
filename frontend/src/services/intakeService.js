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
    return http.get(`${apiEndPointIntake}/get-intakes-status/${status}`);
}

// Get Intake By IntakeId
export function getIntakeByIntakeId(intakeId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/get-intake/${intakeId}`);
}

// Get Intakes by ClientId by Status
export function getIntakesByClientIdByStatus(clientId, status) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/client/${clientId}/${status}`);
}

// Get Open Intake by ClientId
export function getOpenIntakeByClientId(clientId) {
    http.setJwt(getJwt());
    // console.log(`${apiEndPointIntake}/open-intake/client/${clientId}`);
    return http.get(`${apiEndPointIntake}/open-intake/client/${clientId}`);
}

// Save Unsubmitted Intake Form
export function saveIntake(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/save-intake`, data);
}

// Submit Intake Form
export function submitIntake(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/submit-intake`, data);
}

// Admin Approve Submitted Intake Form
export function adminApproveIntake(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/approve-intake/admin`, data);
}

// Project-Lead Approve Submitted Intake Form
export function projectleadApproveIntake(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/approve-intake/projectlead`, data);
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
export function getIntakeDataByIntakeId(intakeId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/${intakeId}/view-intake`);
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
    console.log("hey");
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/${intakeId}/edit-needsAssessment`, data);
}

// Get Intakes By ProjectLeadId By Status
export function getIntakesByPermissionByStatus(permissionLevel, userId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/getIntake-permission-status/${permissionLevel}/${userId}`);
}

// Assign Project-Leads by IntakeId
export function assignProjectLeadsByIntakeId(intakeId, body) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/assign-projectleads/${intakeId}`, body);
}