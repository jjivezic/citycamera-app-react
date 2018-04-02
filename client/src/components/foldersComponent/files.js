import React from 'react';
const Files = (props) => {
    let url = 'https://citycamera.s3.eu-central-1.amazonaws.com/'
    let listFiles = props.list;
    return (
        listFiles ?
            (<div className="files-preview">
                <h4 className="dash-title">List files</h4>
                <ul className="files-box ">
                    {listFiles.map((file, i) =>
                        <li className='file-preview' id={file._id} key={i}>
                            <img src={url + file._id + '.' + file.ext} alt={""} />
                            <div className="image-desc">
                                <p key={file._id}>{file.filename}.{file.ext}</p>
                                <button className="btn btn-danger" onClick={() => { props.delete(file._id, listFiles) }} >Delete</button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            ) : null)
}

export default Files;