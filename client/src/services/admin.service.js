import axios from 'axios';
import { sessionService } from '../sessionService/storage';

var apiBaseUrl = "http://localhost:3000/";

export const adminService = {
    listUsers,
    adminListFolders,
    adminListFiles,
    adminDeleteFiles,
    adminUpdateUser
};
function listUsers() {
    console.log('http list users',)
    return axios.get(apiBaseUrl + 'user/list', { headers: {"x-access-token": sessionService.getSessionToken() } });
}

function  adminListFolders() {
    console.log('http list folders')
    return axios.get(apiBaseUrl + 'file/folders/', { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function  adminListFiles(folder) {
    console.log('http list files',folder)
    return axios.get(apiBaseUrl + 'file/'+folder +'/files', { headers: {"x-access-token": sessionService.getSessionToken() } });
}

function adminDeleteFiles(fileId) {
    console.log('http files delete',fileId)
    return axios.delete(apiBaseUrl + 'file/delete/'+ fileId , { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function  adminListFiles(folder) {
    console.log('http list files',folder)
    return axios.get(apiBaseUrl + 'file/'+folder +'/files', { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function  adminUpdateUser(user) {
    console.log('http list files',user)
return axios.put(apiBaseUrl + 'user/'+user._id ,{isAdmin:user.isAdmin}, { headers: {"x-access-token": sessionService.getSessionToken() } });
}