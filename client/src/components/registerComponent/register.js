import React from 'react';
import { toast } from 'react-toastify';
import { userService } from '../../services/user.service';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registerActions from '../../actions/registerActions';
class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                email: '',
                password: ''
            },
            errors: {}
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


        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        this.setState({
            [event.target.name]: event.target.value
        });
        //ili na ovaj nacin
        // const field = event.target.name;
        // let user = this.state.user;
        // user[field]=  event.target.value;
        //       this.setState({
        //   user:user
        // });
    }

    handleSubmit = event => {
        event.preventDefault();
        // const user = {
        //     username: this.state.username,
        //     password: this.state.password,
        //     email: this.state.email
        // };
        this.props.actions.saveUser(this.state.user);
        this.props.history.push("/login");
        toast.success("Account is successfully created!", this.options)
        // userService.register(this.state.user)
        //     .then(response => {
        //         this.props.history.push("/");
        //         toast.success("Account is successfully created!", this.options)
        //     }).catch(error => {
        //         toast.error("Error creating account!", this.options);
        //         this.setState({ errors: error.data.errors });
        //     });
    }
    validateForm() {
        return this.state.user.username.length > 3 && this.state.user.password.length > 3;
    }
    render() {
        const { user } = this.state;
        return (

            <div className="register-page-container">
                <a className="hiden" href="https://unsplash.com/@zacmeaney?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge"></a>
                <div className="container auth">

                    <form onSubmit={this.handleSubmit}>
                        <h6>Create new account </h6>
                        <div className="form-group">
                            <label>  Username:</label>
                            <input id='username' className="form-control" type="text" name="username" value={user.username} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>  Email:</label>
                            <input id="email" className="form-control" type="text" name="email" value={user.email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input id="password" className="form-control" type="text" name="password" value={user.password} onChange={this.handleChange} />
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

//export default Register;

function mapStateToProps(state, ownProps) {
    console.log('OwnProps', ownProps);
    console.log('OwnProps state', state)
    return {
        register: state.register
    }
}
function mapDispatchToProps(dispatch) {
    console.log('mapDispatchToProps', dispatch);

    return {
        actions:bindActionCreators(registerActions,dispatch)//save all actions from registerActions//all actions available with this.state.actions
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);