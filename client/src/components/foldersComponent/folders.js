import React from 'react';
import { Link, Route } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { filesService, adminService } from '../../services/';
import { Files } from './files';

export class Folders extends React.Component {
    constructor() {
        super()
        this.state = {
            folders: [],
            files: []
        }
        this.getAllFilesForFolder = this.getAllFilesForFolder.bind(this);
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
            console.log('response all files admin', response.data.files);
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
            console.log('response all files', response.data.files);
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
        console.log('This is delete File', file);
        let fileId = file;
        console.log('Pre ', listFiles)
        if (sessionService.isAdmin()) {
            adminService.adminDeleteFiles(fileId).then(response => {
                console.log('success Delete admin ', response);
                listFiles.map(function (el, i) {
                    if (el._id == file) {
                        listFiles.splice(i, 1);
                    }
                })
                console.log('Posle ', listFiles)
                this.setState({
                    files: listFiles
                });
            }).catch(function (error) {
                console.log('error Delete admin', error);
            })
        } else {
                filesService.deleteFiles(fileId).then(response => {
                    console.log('success Delete ', response);
                    listFiles.map(function (el, i) {
                        if (el._id == file) {
                            listFiles.splice(i, 1);
                        }
                    });
                    console.log('Posle ', listFiles)
                    this.setState({
                        files: listFiles
                    });
                }).catch(function (error) {
                    console.log('error Delete', error);
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