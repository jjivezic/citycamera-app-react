import React from 'react';
import { Link, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sessionService } from '../../sessionService/storage';
import { filesService, adminService } from '../../services/';
import { Files } from './files';

export class Folders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            folders: [],
            files: []
        };
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        };
        this.getAllFilesForFolder = this.getAllFilesForFolder.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }
    componentWillMount() {
        if (sessionService.isAdmin()) {
            adminService.adminListFolders().then(response => {
                this.setState({
                    folders: response.data.folders
                });
            }).catch(function (error) {
                console.log('error filesService admin', error);
            });
        } else {
            filesService.userFolders().then(response => {
                this.setState({
                    folders: response.data.folders
                });
            }).catch(function (error) {
                console.log('error filesService ', error);
            });
        }
    }
    adminGetFiles(event) {
        adminService.adminListFiles(event.target.innerText).then(response => {
            this.setState({
                files: response.data.files
            });
            this.props.history.push("/dashboard/folder/files");
        }).catch(function (error) {
            console.log('error getAllFilesForFolder admin', error);
        });
    }
    userGetFiles(event) {
        filesService.userFiles(event.target.innerText).then(response => {
            this.setState({
                files: response.data.files
            });
            this.props.history.push("/dashboard/folder/files");
        }).catch(function (error) {
            console.log('error getAllFilesForFolder', error);
        });
    }
    getAllFilesForFolder = (event) => {
        event.preventDefault();
        if (sessionService.isAdmin()) {
            this.adminGetFiles(event)
        } else {
            this.userGetFiles(event);
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
                toast.error("Error deleting file!", this.options)
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
                toast.success("File is successfully deleted!", this.options)
            }).catch(error => {
                toast.error("Error deleting file!", this.options)
            })

        }
    }

    render() {
        const { match } = this.props;
        let folders = this.state.folders;

        return (
            <div>
                <h1>Folders</h1>
                <ul>
                    {folders.map((folder, i) =>
                        <li key={i}>
                            <Link to={`/dashboard/folder/${folder}`}
                                key={'folder-' + folder}
                                onClick={this.getAllFilesForFolder} >{folder}
                            </Link>
                        </li>
                    )}
                </ul>
                <Route path={`${match.path}/files`} render={() => (
                    <Files list={this.state.files} delete={this.deleteFile} />
                )} />
            </div>
        )
    }
}