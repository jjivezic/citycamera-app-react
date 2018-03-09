import React from 'react';
import { sessionService } from '../../sessionService/storage';
import { adminService } from '../../services/index';


export class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            users: []

        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        if (sessionService.isAdmin()) {
            adminService.listUsers().then(response => {
                console.log('List users', response.data);
                this.setState({
                    users: response.data
                });
            }).catch(function (error) {
                console.log('error filesService admin', error);
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        console.log('target', this.refs.complete.state.checked)
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;

        // this.setState({
        //   [name]: value
        // });
    }
    render() {
        let users = this.state.users;
        console.log('users', users)
        return (
            <div>
                <h1>List users</h1>
                <ul>
                    {users.map((user, i) =>
                        <li key={user._id}> {i} -{user.username}
                            <input type="checkbox"
                                // checked={user._id}
                                onChange={this.handleInputChange} />
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

