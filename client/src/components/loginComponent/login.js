import React from 'react';
import { Register } from '../registerComponent/register';
import { userService } from '../../services/user.service';
import  {sessionStorage}  from '../../sessionStorage/storage';
import { Link } from 'react-router-dom';

export class Login extends React.Component {

    constructor(props) {
       console.log('sessionStorage',sessionStorage)     
        
        super(props);

        this.state = {
            username: '',
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
            password: this.state.password
        };
        console.log('user', user);
        userService.login(user)
            .then(response => {
                console.log('res', response);
                sessionStorage.create(response);
                this.props.history.push("/dashboard");
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="login-page">
                <h1>Login page</h1>
                <form onSubmit={this.handleSubmit}>
                    <br />
                    Username:<input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <br />
                    Password:<input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <button>Login</button>
                </form>
                <Link to='/register'>Register</Link>
            </div>
        );
    }
}
