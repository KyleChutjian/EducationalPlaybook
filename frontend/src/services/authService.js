import jwtDecode from "jwt-decode"; // handles the token
import http from "./httpService";
import { login, logout } from "./userService";
import { getClientIntakeByClientId, getIntakeDataByIntakeId } from '../services/intakeService'

const tokenKey = "token";

http.setJwt(getJwt());

// Login
export async function loginUser(info) {
    const { data: jwt } = await login(info);
    const currentUserId = getCurrentUser(jwt).id;
    const intakeId = getClientIntakeByClientId({clientId: currentUserId}).then((result) => {

        // Null IntakeResponse
        if (result.data === "") {
            localStorage.setItem("intakeId", null);
            localStorage.setItem("intakeResponses", null);

        } else {
            localStorage.setItem("intakeId", result.data[0]._id);
            const intakeResponses = result.data[0].intakeResponse;
            localStorage.setItem("intakeResponses", JSON.stringify(intakeResponses));
        }
        

        
    });

    localStorage.setItem("userId", currentUserId);
    localStorage.setItem(tokenKey, jwt);
}

// Login with JSON Web Token
export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

// Logout
export async function logoutUser() {
    const response = await logout();
    console.log(response);
    localStorage.removeItem(tokenKey);
}

// Get Current User logged in
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);

    } catch (ex) {
        return null;
    }
}

// Get JSON Web Token
export function getJwt() {
    return localStorage.getItem(tokenKey);
}

// Compiled above functions for export
const exportedMethods = {
    loginUser,
    loginWithJwt,
    logoutUser,
    getCurrentUser,
    getJwt
};

export default exportedMethods;