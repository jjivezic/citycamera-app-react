import React from 'react';
import { toast } from 'react-toastify';
import { userService } from '../../services/user.service';

class Register extends React.Component {
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
        return this.state.username.length > 3 && this.state.password.length > 3;
    }
    render() {
        return (

            <div className="register-page-container">
                <a className="hiden" href="https://unsplash.com/@zacmeaney?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge"></a>
                <div className="container auth">

                    <form onSubmit={this.handleSubmit}>
                        <h6>Create new account </h6>
                        <div className="form-group">
                            <label>  Username:</label>
                            <input id='username' className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>  Email:</label>
                            <input id="email" className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input id="password" className="form-control" type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-orange" disabled={!this.validateForm()}>Register</button>
                        <p>You already have account! <a className="text-success" href="#/login"><strong _ngcontent-c11="">Sign in!</strong></a>
                        </p>
                    </form>

                </div>
            </div>

        );
    }
}

export default Register;
