import React from 'react';
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
    getListOfUsers(){
        adminService.listUsers().then(response => {
            console.log('List users', response.data);
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
         }).catch(function (error) {
                console.log('error admin UpdateUser', error);
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

