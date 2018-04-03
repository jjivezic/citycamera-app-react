import React from 'react';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { filesService } from '../../services/';
import Files from './files';

class Folders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            folders: props.folders,
            files: [],
            activeIndex: ''
        };
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        };
        this.deleteFile = this.deleteFile.bind(this);
    }
    refreshFolderAfterDeleteFile = () => {
        this.props.callbackFromParent(this.state.folders);
    }

    getAllFilesForFolder = (folder, index) => {
        filesService.userFiles(folder).then(response => {
            this.setState({
                files: response.data.files,
                activeIndex: index
            });
        }).catch(function (error) {
            console.log('error getAllFilesForFolder', error);
        });
    }
    deleteFile(file, listFiles) {
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
            this.refreshFolderAfterDeleteFile();
        }).catch(error => {
            toast.error("Error deleting file!", this.options)
        })
    }

    render() {
        let folders = this.props.folders;
        return (
            <div className="dashboard-view">
                <h4 className="dash-title">Folders</h4>
                <ul className="folders-list">
                    {folders.map((folder, index) => {
                        const activeLink = this.state.activeIndex === index ? 'activeNavLink folder-link' : 'folder-link';
                        return <li key={index} >
                            <NavLink to="/dashboard/folder" id={"my-" + folder} key={index} className={activeLink} onClick={this.getAllFilesForFolder.bind(this, folder, index)} >
                                {folder}</NavLink>  </li>
                    })}
                </ul>
                {this.state.files && this.state.files.length > 0 ?
                    <Files list={this.state.files} delete={this.deleteFile} />
                    : null}
            </div>
        )
    }
}
export default Folders;
