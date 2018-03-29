import axios from 'axios';
import { sessionService } from '../sessionService/storage';
var apiBaseUrl = "http://localhost:3000/";

export const filesService = {
    userFolders,
    userFiles,
    deleteFiles,
    getUploadLink,
    uploadImageAmazon
};
    
//let token = sessionService.getSessionToken();

function  userFolders() {
    return axios.get(apiBaseUrl + 'file/folders/'+ sessionService.getUserId(), { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function  userFiles(folder) {
    return axios.get(apiBaseUrl + 'file/'+ sessionService.getUserId()+ '/'+ folder +'/files', { headers: {"x-access-token": sessionService.getSessionToken() } });
}

function  deleteFiles(fileId) {
    return axios.delete(apiBaseUrl + 'file/'+ sessionService.getUserId()+ '/delete/'+ fileId , { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function  getUploadLink(fileData) {
    console.log('File HTTP',fileData)
    return axios.post(apiBaseUrl + 'file/'+ sessionService.getUserId()+ '/getUploadURL',fileData, { headers: {"x-access-token": sessionService.getSessionToken() } });
}
function uploadImageAmazon(presignedUrl, body) {
console.log('amazonupload HTTP', presignedUrl, body)
    return axios.put(presignedUrl, body)
}