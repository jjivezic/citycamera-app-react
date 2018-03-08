import axios from 'axios';
import { sessionService } from '../sessionService/storage';

var apiBaseUrl = "http://localhost:3000/";

export const filesService = {
    userFolders,
    getAllFilesForFolder
};
//let token = sessionService.getSessionToken();

function  userFolders() {
    console.log('http files token')
    return axios.get(apiBaseUrl + 'file/folders/'+ sessionService.getUserId(), { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function  getAllFilesForFolder(folder) {
    console.log('http files token',folder)
    return axios.get(apiBaseUrl + 'file/'+ sessionService.getUserId()+ '/'+ folder +'/files', { headers: {"x-access-token": sessionService.getSessionToken() } });
}
