import axios from 'axios';

var apiBaseUrl = "http://localhost:3000/";

export const userService = {
    login,
    logout,
    register
};

function login(user) {
    return axios.post(apiBaseUrl + 'user/login', user);
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    return axios.post(apiBaseUrl + 'user/register', user);
}