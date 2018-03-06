import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { userService } from '../../services/user.service';

import { Login } from '../loginComponent/login';

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };
        console.log('user', user);
        userService.register(user)
            .then(response => {
                console.log('res', response);
                this.props.history.push("/");
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="login-page">
                <h1>Register page</h1>
                <form onSubmit={this.handleSubmit}>
                    <br />
                    Username:<input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <br />
                    Email:<input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    <br />
                    Password:<input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <button>Register</button>
                </form>
                <Link to='/'>Login</Link>
            </div>
        );
    }
}


