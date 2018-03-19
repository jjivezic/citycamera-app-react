import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { filesService, adminService } from '../../services/';
import  Folders  from '../foldersComponent/folders';
import  Users from '../usersComponent/listUsers';
import PageNotFound from '../pageNotFound/pageNotFound';

class Dashboard extends React.Component {

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

        return (
           
            <div>

                <nav className="">
                    <ul className="">
        
                        <li>
                            <NavLink activeClassName='activeNavLink' to="/dashboard/folder" exact>Folders</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='activeNavLink'  to="/dashboard/admin">Admin Update user</NavLink>
                        </li>
                     
                        <li><a href="" onClick={() => { sessionService.destroy() }} >Logout</a></li>

                    </ul>
                </nav>
                <Switch>
                    <Route path="/dashboard/folder" render={() => <Folders folders={this.state.folders} />} />
                    <Route path="/dashboard/admin" component={Users} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        
        )
    }
}

export default Dashboard;