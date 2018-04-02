import React from 'react';
import { toast } from 'react-toastify';
import FileReaderInput from 'react-file-reader-input';
import { filesService } from '../../services/';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            file: '',
            disabled: false
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        };
    }
    handleChange = (e, results) => {

        results.forEach(result => {
            const [e, file] = result;
            console.log(`Successfully uploaded ${file.name}!`);
            console.log('results', file);
            this.setState({
                file: file,
                disabled: true
            });
            this.getUploadLink(file);
        });

    }
    handleUpload = (event) => {
        const url = this.state.url;
        const file = this.state.file;

        filesService.uploadImageAmazon(url, file).then(response => {
            console.log('respons', response);
            this.props.history.push("/dashboard/folder");
            toast.success("Image uploaded successfully to Amazon !", this.options)
        }, error => {
            toast.success("Error uploading image to Amazon !", this.options)
        })
    }

    getUploadLink(file) {

        let fileData = file.name;
        let dotIndex = fileData.lastIndexOf(".");
        let fileName = fileData.slice(0, dotIndex);
        let fileExt = fileData.slice(dotIndex + 1);
        let data = {
            file: fileName,
            ext: fileExt
        }
        filesService.getUploadLink(data).then(response => {
            console.log('url', response.data);
            this.setState({ url: response.data.url });
        }).catch(function (error) {
            console.log('error filesService ', error);
        });
    }

    render() {
        let file = this.state.file;
        return (
            <div className="dashboard-view">
             <h4 className="dash-title">Upload images</h4>
             <div className="uploaded-box">
                <form>
                    <FileReaderInput as="binary" id="my-file-input"
                        onChange={this.handleChange}>
                        <div>
                      
                          <p> Upload image from your computer:<button className="upload-btn"> Choose file <i className="fa fa-folder"></i></button>  <span>{file.name}</span> </p> 
                     
                        </div>
                    </FileReaderInput>
                </form>
                <br />
                <button className="btn btn-orange" onClick={this.handleUpload} disabled={!this.state.disabled}>Upload to amazon! </button>
                </div>
            </div>
        )
    }
}

export default Upload;