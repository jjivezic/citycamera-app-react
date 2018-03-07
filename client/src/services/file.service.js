import axios from 'axios';
import { sessionService } from '../sessionService/storage';

var apiBaseUrl = "http://localhost:3000/";

export const filesService = {
    userFolders
};
let token = sessionService.getSessionToken();

function  userFolders() {
    console.log('http files token',token)
    return axios.get(apiBaseUrl + 'file/folders/'+ sessionService.getUserId(), { headers: {"x-access-token": token } });
}

