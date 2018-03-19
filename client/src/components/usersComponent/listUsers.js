import React from 'react';
import { toast } from 'react-toastify';
import { sessionService } from '../../sessionService/storage';
import { adminService } from '../../services/index';
import {Link, Route, Switch } from 'react-router-dom';

import  UserPreview from '../usersComponent/listUsers';

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        };
    }

    getListOfUsers(){
        adminService.listUsers().then(response => {
            this.setState({
                users: response.data
            });
        }).catch(error => {
            console.log('error admin getListOfUsers', error);
        });
    }
    // getUserById(){
    //     adminService.getUserById(user).then(response => {
    
    //     }).catch(error => {
    //         console.log('error admin getListOfUsers', error);
    //     });
    // }
    componentDidMount() {
        //const { match: { params } } = this.props;
        console.log('component did mount',this.props.match)
        if (sessionService.isAdmin()) {
         this.getListOfUsers();
        }

    }

    handleInputChange(user) {
        
        user.isAdmin = !user.isAdmin;  
        adminService.adminUpdateUser(user).then(response => {
            this.getListOfUsers();
            toast.success("User is successfully updated!",this.options);
         }).catch(error => {
            toast.error("Error updating user!",this.options)
            });

    }
    render() {
        let users = this.state.users;
        console.log('users', users);
        return (
            <div>
                <h1>List users</h1>
                <ul>
                    {users.map((user, i) =>
                        <li key={user._id}> {i} 
                        <Link to={`/dashboar/user/${user._id}`}>{user.username} </Link>
                            <input type="checkbox"
                            checked={user.isAdmin}
                                onChange={() =>  this.handleInputChange(user)}/>
                        </li>
                    )}
                </ul>

                <Route path="/dashboar/user/:id" component={UserPreview} />

            </div>
        )
    }
}

export default Users;
