import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { sessionService } from '../../sessionService/storage';
import { filesService, adminService } from '../../services/';
import  Folders  from '../foldersComponent/folders';
import  Users from '../usersComponent/listUsers';
import PageNotFound from '../pageNotFound/pageNotFound';
import UserPreview from '../usersComponent/singleUsers'
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
console.log('props',this.props)
        return (
           
            <div>

                <nav className="">
                    <ul className="">
        
                        <li>
                            <NavLink activeClassName='activeNavLink' to="/dashboard/folder" exact>Folders</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='activeNavLink'  to="/dashboard/users">Admin Update user</NavLink>
                        </li>
                        <li><a href="" onClick={() => { sessionService.destroy() }} >Logout</a></li>

                    </ul>
                </nav>
                <Switch>
                    <Route path="/dashboard/folder" render={() => <Folders folders={this.state.folders} />} />
                    <Route path="/dashboard/users" component={Users} />
                    <Route path="/dashboard/user/:userId"  component={UserPreview}  />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        
        )
    }
}

export default Dashboard;