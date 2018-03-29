import axios from 'axios';
import { sessionService } from '../sessionService/storage';

var apiBaseUrl = "http://localhost:3000/";

export const adminService = {
    listUsers,
    adminListFolders,
    adminListFiles,
    adminDeleteFiles,
    adminUpdateUser,
    adminGetUserById
};
function listUsers() {
    return axios.get(apiBaseUrl + 'user/list', { headers: {"x-access-token": sessionService.getSessionToken() } });
}

function  adminListFolders() {
    return axios.get(apiBaseUrl + 'file/folders/', { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function  adminListFiles(folder) {
    return axios.get(apiBaseUrl + 'file/'+folder +'/files', { headers: {"x-access-token": sessionService.getSessionToken() } });
}

function adminDeleteFiles(fileId) {
    return axios.delete(apiBaseUrl + 'file/delete/'+ fileId , { headers: {"x-access-token": sessionService.getSessionToken() } });
}

function  adminUpdateUser(user) {
    return axios.put(apiBaseUrl + 'user/'+user._id ,user, { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function  adminGetUserById(id) {
    return axios.get(apiBaseUrl + 'user/'+id , { headers: {"x-access-token": sessionService.getSessionToken() } });
}