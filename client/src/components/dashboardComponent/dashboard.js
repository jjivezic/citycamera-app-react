import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { filesService, adminService } from '../../services/';
import Folders from '../foldersComponent/folders';
import Users from '../usersComponent/listUsers';
import PageNotFound from '../pageNotFound/pageNotFound';
import UserPreview from '../usersComponent/singleUsers';
import Upload from '../uploadComponent/upload';
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            folders: [],
            isAdmin: false
        }
        this.isAdmin = this.isAdmin.bind(this);
    }
    getFolders() {
        filesService.userFolders().then(response => {
            this.setState({
                folders: response.data.folders
            });
        }).catch(function (error) {
            console.log('error filesService ', error);
        });
    }
    componentDidMount() {
        this.getFolders();
    }
    componentWillReceiveProps() {
        this.getFolders();
    }
    isAdmin() {
        return sessionService.isAdmin();
    }
    refreshFolder = (dataFromChildFolder) => {
        this.setState({
            folders: dataFromChildFolder
        });
    }
    render() {
        return (
            <div>
                <nav className="">
                    <ul className="">
                        <li>
                            <NavLink className="nav-link" activeClassName='activeNavLink' to="/dashboard/folder" exact>Folders</NavLink>
                        </li>
                        {this.isAdmin() ?
                            <li>
                                <NavLink className="nav-link" activeClassName='activeNavLink' to="/dashboard/users " exact>Admin Update user</NavLink>
                            </li>
                            : null}
                        <li>
                            <NavLink className="nav-link" activeClassName='activeNavLink' to="/dashboard/upload" exact>Upload image</NavLink>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/dashboard/folder" render={() => <Folders folders={this.state.folders} callbackFromParent={this.refreshFolder} />} />
                    <Route path="/dashboard/users" component={Users} />
                    <Route path="/dashboard/user/:userId" component={UserPreview} />
                    <Route path="/dashboard/upload" component={Upload} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>

        )
    }
}

export default Dashboard;