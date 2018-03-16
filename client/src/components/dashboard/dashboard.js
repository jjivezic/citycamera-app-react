import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { filesService, adminService } from '../../services/';
import { Folders } from '../foldersComponent/folders';
import { Users } from '../foldersComponent/listUsers';


export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            folders: []
        }
      
    }
    getFolders() {
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
    componentDidMount() {
        this.getFolders();
    }

    render() {
        console.log('Render', this.state.folders);
    
        return (
           
            <div>

                <nav className="">
                    <ul className="">
                        <li>
                            <Link to="/dashboard/folder">Folders</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/admin">Admin Update user</Link>
                        </li>
                        <li><a href="" onClick={() => { sessionService.destroy() }} >Logout</a></li>

                    </ul>
                </nav>
                <Switch>
                    <Route path="/dashboard/folder" render={() => <Folders folders={this.state.folders} />} />
                    <Route path="/dashboard/admin" component={Users} />
                </Switch>
            </div>
        
        )
    }
}
