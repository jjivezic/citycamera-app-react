import React from 'react';

export const Files = (props) => {
    console.log('Props', props)
    let listFiles = props.list;
    return (
        <div> <h1>LIST FILES</h1>
            <ul>
                {listFiles.map((item) =>
                    <li><p key={item._id}>{item.filename}.{item.ext}</p>
                        <img src="https://citycamera.s3.eu-central-1.amazonaws.com/{{item._id}}.{{item.ext}}" />
                    </li>
                )}
            </ul>
        </div>
    )

}