import React from 'react';
import { toast } from 'react-toastify';
import FileReaderInput from 'react-file-reader-input';
import { sessionService } from '../../sessionService/storage';
import { filesService } from '../../services/';

class Upload extends React.Component {
    handleChange = (e, results) => {
         console.log('e',e);
     
       results.forEach(result => {
            const [e, file] = result;
         //   this.props.dispatch(uploadFile(e.target.result));
            console.log(`Successfully uploaded ${file.name}!`);
           console.log('results', file);
           this.getUploadLink(file)
        });
     
    }
    // uploadFile(test){
    //     console.log('test',test)
    // }
    getUploadLink(file) {
      
        let fileData =  file.name;
        let dotIndex= fileData.lastIndexOf(".");
        let fileName = fileData.slice(0,dotIndex);
        let fileExt = fileData.slice(dotIndex+1);
        console.log('file>>>',fileExt);
        let data = {
            file:fileName,
            ext:fileExt
        }
        filesService.getUploadLink(data).then(response => {
            console.log('urll', response.data);
        }).catch(function (error) {
            console.log('error filesService ', error);
        });
    }

    render() {
        return (
            <div>
                Upload page
                <form>
                    <label htmlFor="my-file-input">Upload a File:</label>
                    <FileReaderInput as="binary" id="my-file-input"
                        onChange={this.handleChange}>
                        <button>Select a file!</button>
                    </FileReaderInput>
                </form>
            </div>
        )
    }
}

export default Upload;