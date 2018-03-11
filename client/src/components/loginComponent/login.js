import React from 'react';
import { userService } from '../../services/user.service';
import { sessionService } from '../../sessionService/storage';
import { Link, Redirect } from 'react-router-dom';

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
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
        userService.login(user)
            .then(response => {
                sessionService.create(response.data);
                if (sessionService.isAuth()) {
                    this.setState({ redirectToReferrer: true })
                    this.props.history.push("/dashboard");
                }
            }).catch(function (error) {
                console.log('Login error',error);
            });
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 3;
    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state;

        console.log('redirectToReferrer', redirectToReferrer, this.state)

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <div className="login-page">
                <h1>Login page</h1>
                <form onSubmit={this.handleSubmit}>
                    <br />
                    Username:<input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <br />
                    Password:<input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <button disabled={!this.validateForm()}>Login</button>
                </form>
                <Link to='/register'>Register</Link>
            </div>
        );
    }
}
