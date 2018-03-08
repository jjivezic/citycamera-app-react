import axios from 'axios';
import { sessionService } from '../sessionService/storage';

var apiBaseUrl = "http://localhost:3000/";

export const filesService = {
    userFolders,
    userFiles,
    deleteFiles
};
//let token = sessionService.getSessionToken();

function  userFolders() {
    console.log('http list folders')
    return axios.get(apiBaseUrl + 'file/folders/'+ sessionService.getUserId(), { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function  userFiles(folder) {
    console.log('http list files',folder)
    return axios.get(apiBaseUrl + 'file/'+ sessionService.getUserId()+ '/'+ folder +'/files', { headers: {"x-access-token": sessionService.getSessionToken() } });
}

function  deleteFiles(fileId) {
    console.log('http files delete',fileId)
    return axios.delete(apiBaseUrl + 'file/'+ sessionService.getUserId()+ '/delete/'+ fileId , { headers: {"x-access-token": sessionService.getSessionToken() } });
}