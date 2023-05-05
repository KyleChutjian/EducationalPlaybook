import http from "./httpService";
import { getJwt } from "./authService";

const apiEndPointCurriculum = "https://educationalplaybook.herokuapp.com/curriculum";
// const apiEndPointCurriculum = "http://localhost:3001/curriculum";

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
    const encodedPath = encodeURIComponent(filePath);
    return http.get(`${apiEndPointCurriculum}/getFile/${encodedPath}`);
}

// Upload files to server
export function uploadFiles(curriculumId, data) {
    http.setJwt(getJwt());
    return http.post(`${apiEndPointCurriculum}/${curriculumId}/uploadFiles`, data);
}