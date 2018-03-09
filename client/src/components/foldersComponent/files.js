import React from 'react';
import { sessionService } from '../../sessionService/storage';
import { filesService,adminService } from '../../services/';

function deleteFile(filesId) {
    console.log('Delete function', filesId)
    if (sessionService.isAdmin()) {
        adminService.adminDeleteFiles(filesId).then(response => {
            console.log('success Delete admin ', response);
        }).catch(function (error) {
            console.log('error Delete admin', error);
        })
    } else {
        if (sessionService.isAdmin()) {
            filesService.deleteFiles(filesId).then(response => {
                console.log('success Delete ', response);
            }).catch(function (error) {
                console.log('error Delete', error);
            })
        }
    }
}
    export const Files = (props) => {
        let url = 'https://citycamera.s3.eu-central-1.amazonaws.com/'
        let listFiles = props.list;
        return (
            <div> <h1>LIST FILES</h1>
                <ul>
                    {listFiles.map((file, i) =>
                        <li key={i}><p key={file._id}>{file.filename}.{file.ext}</p>
                            <div> <img src={url + file._id + '.' + file.ext}  alt={""} /></div>
                            <br />
                            <button onClick={() => { deleteFile(file._id) }}>Delete</button>
                        </li>
                    )}
                </ul>
            </div>
        )

    }