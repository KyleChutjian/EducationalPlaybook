import http from "./httpService";
import { getJwt } from "./authService";

// const apiEndPointUser = "http://localhost:3001/user";
const apiEndPointUser = `https://educationalplaybook.herokuapp.com/user`;

// Login
export function login(data) {
    return http.post(`${apiEndPointUser}/login`, data);
}

// Logout
export function logout() {
    return http.post(`${apiEndPointUser}/logout`);
}

// Change Password
export function changePassword(data) {
    console.log(`${apiEndPointUser}/change-password`)
    return http.put(`${apiEndPointUser}/change-password`, data);
}

// Get-accounts
export function getAccounts() {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointUser}/get-accounts`);
}

// Get-accounts
export function getUserByUserId(userId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointUser}/get-user/${userId}`);
}

// Get-accounts by role
export function getAccountsByRole(role) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointUser}/get-accounts/${role}`);
}

// Create Account
export function createAccount(data) {
    http.setJwt(getJwt());
    return http.post(`${apiEndPointUser}/create-account`, data);
}

// Updating a Specific User's Role
export function manageAccounts(userId, role, output) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointUser}/manage-accounts/${userId}/${role}/${output}`);
}

// Deleting a User by UserID
export function deleteUserByUserId(userId) {
    http.setJwt(getJwt());
    return http.delete(`${apiEndPointUser}/delete/${userId}`);
}

// Get Dashboards by UserId
export function getDashboardsByUserId(userId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointUser}/dashboards/${userId}`);
}