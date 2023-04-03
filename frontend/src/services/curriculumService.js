import http from "./httpService";
import { getJwt } from "./authService";

const apiEndPointCurriculum = "http://localhost:3001/curriculum";

// Get All Curriculums
export function getAllCurriculums() {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointCurriculum}`);
}

// Get Curriculum by CurriculumId
export function getCurriculumByCurriculumId(curriculumId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointCurriculum}/${curriculumId}`);
}

// Get Curriculum by IntakeId
export function getCurriculumByIntakeId(intakeId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointCurriculum}/get-curriculum-intake/${intakeId}`);
}

// Delete Curriculum by CurriculumId
export function deleteCurriculumByCurriculumId(curriculumId) {
    http.setJwt(getJwt());
    return http.delete(`${apiEndPointCurriculum}/${curriculumId}`);
}

// Save Curriculum by CurriculumId
export function saveCurriculum(curriculumId, data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointCurriculum}/${curriculumId}/saveChanges`, data);
}

export function getFileByPath(filePath) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointCurriculum}/getFile/${filePath}`);
}

// Upload files to server
export function uploadFiles(curriculumId, data) {
    http.setJwt(getJwt());
    return http.post(`${apiEndPointCurriculum}/${curriculumId}/uploadFiles`, data);
}

// The rest are probably not needed:

// Get Learning Objectives by CurriculumId
export function getLearningObjectivesByCurriculumId(curriculumId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointCurriculum}/${curriculumId}/learningObjectives`);
}

// Add New Learning Objective
export function addLearningObjectiveByCurriculumId(curriculumId, data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointCurriculum}/add-learning-objective/${curriculumId}`, data);
}

// Create/Update Learning Objectives by CurriculumId
export function updateLearningObjectivesByCurriculumId(curriculumId, data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointCurriculum}/${curriculumId}/update-learningObjective`, data);
}

// Delete 1 Learning Objective by CurriculumId
export function deleteLearningObjectiveByCurriculumIdByIndex(curriculumId, index) {
    http.setJwt(getJwt());
    return http.delete(`${apiEndPointCurriculum}/${curriculumId}/delete-learningObjective/${index}`);
}