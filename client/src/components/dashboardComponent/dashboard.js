import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { filesService } from '../../services/';
import Folders from '../foldersComponent/folders';
import Users from '../usersComponent/listUsers';
import PageNotFound from '../pageNotFound/pageNotFound';
import UserPreview from '../usersComponent/singleUsers';
import Upload from '../uploadComponent/upload';
import sinon from 'sinon';


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            folders: [],
            isAdmin: false,
            user: {}
        }

        this.isAdmin = this.isAdmin.bind(this);
    }
    getUserName() {
        let user = sessionService.getUser();
        this.setState({
            user: user
        })
    }
    getFolders() {
        filesService.userFolders().then(response => {
            this.setState({
                folders: response.data.folders
            });
        }).catch(function (error) {
            console.log('error getFolders ', error);
        });
    }
    componentDidMount() {
        this.getFolders();
        this.getUserName()
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
        let user = this.state.user.username;
        return (
            <div className="dashboard-wraper">
                <div className="dashboard-navbar">
                    <div className="loged-user">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                        <h6> Welcome, <span>{user}</span>  </h6>
                    </div>
                    <ul className="dash-navbar">
                        <li>
                            <NavLink className="nav-link" activeClassName='activeNavLink' to="/dashboard/folder" >Folders</NavLink>
                        </li>
                        {this.isAdmin() ?
                            <li>
                                <NavLink className="nav-link" activeClassName='activeNavLink' to="/dashboard/users" >Update user</NavLink>
                            </li>
                            : null}
                        <li>
                            <NavLink className="nav-link" activeClassName='activeNavLink' to="/dashboard/upload" >Upload image</NavLink>
                        </li>
                    </ul>
                </div>
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