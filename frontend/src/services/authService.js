import jwtDecode from "jwt-decode";
import http from "./httpService";
import { login, logout } from "./userService";

const tokenKey = "token";

http.setJwt(getJwt());

// Login
export async function loginUser(info) {
    const { data: jwt } = await login(info);

    localStorage.setItem(tokenKey, jwt);
}

// Login with JSON Web Token
export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

// Logout
export async function logoutUser() {
    const respond = await logout();
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