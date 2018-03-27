import React from 'react';
import { toast } from 'react-toastify';
import FileReaderInput from 'react-file-reader-input';
import { sessionService } from '../../sessionService/storage';
import { filesService } from '../../services/';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            file: ''
        }
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleChange = (e, results) => {
        console.log('e', e);
        results.forEach(result => {
            const [e, file] = result;
            //   this.props.dispatch(uploadFile(e.target.result));
            console.log(`Successfully uploaded ${file.name}!`);
            console.log('results', file);
            this.setState({ file: file });
            this.getUploadLink(file);
        });

    }
    handleUpload = (event) => {
        const url = this.state.url;
        const file = this.state.file;

        filesService.uploadImageAmazon(url, file).then(response => {
            console.log('respons', response)
        }, error => {
            console.log('error>>>', error)
        })
    }

    getUploadLink(file) {

        let fileData = file.name;
        let dotIndex = fileData.lastIndexOf(".");
        let fileName = fileData.slice(0, dotIndex);
        let fileExt = fileData.slice(dotIndex + 1);
        console.log('file>>>', fileExt);
        let data = {
            file: fileName,
            ext: fileExt
        }
        filesService.getUploadLink(data).then(response => {
            console.log('urll', response.data);
            this.setState({ url: response.data.url });
        }).catch(function (error) {
            console.log('error filesService ', error);
        });
    }

    render() {
        let file = this.state.file;
        return (
            <div>
                <form>
                    <label htmlFor="my-file-input">Upload a File:</label>
                    <FileReaderInput as="binary" id="my-file-input"
                        onChange={this.handleChange}>
                        <button><i className="fa fa-folder"></i></button>
                        {file.name}
                    </FileReaderInput>
                </form>
                <button className="btn btn-primary" onClick={this.handleUpload}>Upload to amazon! </button>
            </div>
        )
    }
}

export default Upload;