import React from 'react';
import { toast } from 'react-toastify';
import { sessionService } from '../../sessionService/storage';
import { filesService, adminService } from '../../services/';
import Files from './files';

 class Folders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            folders: props.folders,
            files: []
        };
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        };
        this.deleteFile = this.deleteFile.bind(this);
    }

    adminGetFiles(folder) {
        adminService.adminListFiles(folder).then(response => {
            this.setState({
                files: response.data.files
            });
        }).catch(function (error) {
            console.log('error getAllFilesForFolder admin', error);
        });
    }
    userGetFiles(folder) {
        filesService.userFiles(folder).then(response => {
            this.setState({
                files: response.data.files
            });
        }).catch(function (error) {
            console.log('error getAllFilesForFolder', error);
        });
    }
    getAllFilesForFolder = (folder) => {
        if (sessionService.isAdmin()) {
            this.adminGetFiles(folder)
        } else {
            this.userGetFiles(folder);
        }

    }
    deleteFile(file, listFiles) {
        let fileId = file;
        if (sessionService.isAdmin()) {
            adminService.adminDeleteFiles(fileId).then(response => {
                listFiles.forEach(function (el, i) {
                    if (el._id === file) {
                        listFiles.splice(i, 1);
                    }
                })
                this.setState({
                    files: listFiles
                });
                toast.success("File is successfully deleted!", this.options)
            }).catch(error => {
                console.log('error Delete admin', error);
            })
        } else {
            filesService.deleteFiles(file).then(response => {
                listFiles.forEach(function (el, i) {
                    if (el._id === file) {
                        listFiles.splice(i, 1);
                    }
                });
                this.setState({
                    files: listFiles
                });
                toast.success("File is successfully deleted!", this.options);
                if (response.data && response.data.success === true) {
                    console.log('its success')
                }
            }).catch(error => {
                toast.error("Error deleting file!", this.options)
            })

        }
    }

    render() {
        let folders = this.props.folders;

        return (
            <div className="folders-page">
                <h1>Folders</h1>
                <ul>
                    {folders.map((folder, i) =>
                        <li key={i}>
                       <a href="#/dashboard/folder/files" id= {folder} className="folder-link" key={i} onClick={this.getAllFilesForFolder.bind(this, folder)} >
                        {folder}</a>  </li>
                    )}
                </ul>
                {this.state.files && this.state.files.length > 0 ?
                    <Files list={this.state.files} delete={this.deleteFile} />
                 : null}
            </div>
        )
    }
}
export default Folders;
