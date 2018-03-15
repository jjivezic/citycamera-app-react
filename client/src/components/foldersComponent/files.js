import React from 'react';

    export const Files = (props) => {
        let url = 'https://citycamera.s3.eu-central-1.amazonaws.com/'
        let listFiles = props.list;
        return (
            <div> 
                <h3>LIST FILES</h3>
                <ul>
                    {listFiles.map((file, i) =>
                        <li className='file-preview' id={file._id} key={i}><p key={file._id}>{file.filename}.{file.ext}</p>
                            <div> <img src={url + file._id + '.' + file.ext}  alt={""} /></div>
                            <br />
                            <button onClick={() => { props.delete(file._id,listFiles) }} >Delete</button>
                        </li>
                    )}
                </ul>
            </div>
        )
    }