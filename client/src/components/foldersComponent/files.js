import React from 'react';
import { filesService } from '../../services/file.service';

function deleteFile(filesId) {
    console.log('Delete function', filesId)

    filesService.deleteFiles(filesId).then(response => {
        console.log('success Delete ', response);
    }).catch(function (error) {
        console.log('error Delete', error);
    });
}
export const Files = (props) => {

    let url = 'https://citycamera.s3.eu-central-1.amazonaws.com/'
    let listFiles = props.list;
    return (
        <div> <h1>LIST FILES</h1>
            <ul>
                {listFiles.map((item) =>
                    <li><p key={item._id}>{item.filename}.{item.ext}</p>
                        <div> <img src={url + item._id + '.' + item.ext} /></div>
                        <br />
                        <button onClick={() => { deleteFile(item._id) }}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    )

}