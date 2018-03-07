import React from 'react';
import { Link, Route } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { filesService } from '../../services/file.service';

export const Folders = () => {
    console.log('filesService Folders componenta')
    filesService.userFolders().then(response => {
        console.log('response', response.data);
    }).catch(function (error) {
        console.log('error 111',error);
    });
    return (

        <div>
            <h1>Folders</h1>
            <ul><li></li>
            </ul>
        </div>
    )

}