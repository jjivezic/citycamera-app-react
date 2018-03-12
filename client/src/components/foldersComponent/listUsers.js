import React from 'react';
import { toast } from 'react-toastify';

import { sessionService } from '../../sessionService/storage';
import { adminService } from '../../services/index';


export class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    options = {
        autoClose: 3000,
        hideProgressBar: true,
    };
    getListOfUsers(){
        adminService.listUsers().then(response => {
            this.setState({
                users: response.data
            });
        }).catch(function (error) {
            console.log('error admin getListOfUsers', error);
        });
    }
    componentWillMount() {
        if (sessionService.isAdmin()) {
         this.getListOfUsers();
        }
    }

    handleInputChange(user) {
        
        user.isAdmin = !user.isAdmin;  
        adminService.adminUpdateUser(user).then(response => {
            this.getListOfUsers();
            toast.success("User is successfully updated!",this.options);
         }).catch(function (error) {
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
                        <li key={user._id}> {i} -{user.username}
                            <input type="checkbox"
                            checked={user.isAdmin}
                                onChange={() =>  this.handleInputChange(user)}/>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

