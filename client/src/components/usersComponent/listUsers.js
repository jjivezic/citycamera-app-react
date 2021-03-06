import React from 'react';
import { toast } from 'react-toastify';
import { sessionService } from '../../sessionService/storage';
import { adminService } from '../../services/index';
import { Link } from 'react-router-dom';

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        };
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        }
    }

    getListOfUsers() {
        adminService.listUsers().then(response => {
            this.setState({
                users: response.data
            });
        }).catch(error => {
            console.log('error admin getListOfUsers', error);
        });
    }
    componentDidMount() {
        if (sessionService.isAdmin()) {
            this.getListOfUsers();
        }

    }

    handleInputChange(user) {
        user.isAdmin = !user.isAdmin;
        adminService.adminUpdateUser(user).then(response => {
            this.getListOfUsers();
            toast.success("User is successfully updated!", this.options);
        }).catch(error => {
            toast.error("Error updating user!", this.options)
        });

    }
    render() {
        let users = this.state.users;
        return (
            <div className="dashboard-view">
                <h4 className="dash-title">List users</h4>
                <ul className="users-list">
                    {users.map((user, i) =>
                        <li key={user._id}>
                            <span>{i + 1}</span>
                            <p>{user.username} </p>
                            <div className="list-right">
                                <label htmlFor="">IsAdmin:</label>
                                <input type="checkbox"
                                    checked={user.isAdmin}
                                    onChange={() => this.handleInputChange(user)} />
                                <Link className="btn btn-orange" to={`/dashboard/user/${user._id}`}>Edit </Link>
                            </div>

                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Users;
