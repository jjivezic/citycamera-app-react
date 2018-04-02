import React from 'react';
import { toast } from 'react-toastify';
import { userService } from '../../services/user.service';
import { sessionService } from '../../sessionService/storage';
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectToDashboard: false,
            submitted: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ submitted: true });
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        userService.login(user)
            .then(response => {
                sessionService.create(response.data);
                if (sessionService.isAuth()) {
                    this.setState({ redirectToDashboard: true })
                    this.props.history.push("/dashboard/folder");
                    toast.success("User is successfully loged !", this.options)
                }
            }).catch(error => {
                toast.error("Error Wrong username or password!", this.options)
            });
    }

    validateForm() {
        return this.state.username.length > 3 && this.state.password.length > 3;
    }

    render() {
        return (
            <div className="login-page-container">
                <a class="hiden" href="https://unsplash.com/@zacmeaney?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge"></a>
                <div className="container auth">
                    <form onSubmit={this.handleSubmit}>
                        <h6>Please sign in </h6>
                        <div className="form-group">
                            <label>  Username:</label>
                            <input id='username' className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />

                        </div>
                        <div className="form-group">
                            <label>  Password:</label>
                            <input id='password' className="form-control" type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-orange" disabled={!this.validateForm()} >Login</button>
                        <p _ngcontent-c10="">Don't have an account yet? <a class="text-success" routerlink="/#register" href="#/register">
                            <strong>Sign up!</strong></a>
                        </p>
                    </form>

                </div>
            </div>
        );
    }
}

export default Login;