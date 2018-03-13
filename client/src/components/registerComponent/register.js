import React from 'react';
import { Link ,Switch} from "react-router-dom";
import { toast } from 'react-toastify';
import { userService } from '../../services/user.service';

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
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        };
    }
;
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
        userService.register(user)
            .then(response => {
                this.props.history.push("/");
                toast.success("Account is successfully created!", this.options)
            }).catch(error => {
                toast.error("Error creating account!", this.options)
            });
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 3;
    }
    render() {
        return (
            <div className="auth-page">
                <h1>Register page</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>  Username:</label>
                        <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>  Email:</label>
                        <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-control" type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-primary" disabled={!this.validateForm()}>Register</button>
                </form>
               <Link to='/'>Login</Link>
            </div>
        );
    }
}


