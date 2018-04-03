import React from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../../services/index';
import { Link } from 'react-router-dom';

class UserPreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            _id: '',
            isAdmin: ''

        }
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getUserById(user) {
        adminService.adminGetUserById(user).then(response => {
            this.setState({
                username: response.data.username,
                email: response.data.email,
                password: response.data.password,
                isAdmin: response.data.isAdmin
            });
        }).catch(error => {
            console.log('error admin getListOfUsers', error);
        });
    }
    componentDidMount() {
        this.onRouteChanged();
    }
    //or componendDidUpdate
    componentWillReceiveProps(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }
    onRouteChanged() {
        console.log("ROUTE CHANGED");
        let userId = this.props.match.params.userId;
        this.setState({ _id: userId })
        this.getUserById(userId);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            _id: this.state._id,
            isAdmin: this.state.isAdmin
        };
        adminService.adminUpdateUser(user).then(response => {
            toast.success("User is successfully updated!", this.options);
        }).catch(error => {
            toast.error("Error updating user!", this.options)
        });
    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    validateForm() {
        return this.state.username.length > 3 && this.state.password.length > 3;
    }
    render() {
        return (
            <div className="dashboard-view">
                <h4 className="dash-title">Edit User details</h4>
                <Link to={"/dashboard/users"}>Back to list</Link>
                <form className="form-edit-user text-left" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor=""> Username:</label>
                        <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Email:</label>
                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Password:</label>
                        <input type="text" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor=""> Is admin:</label>
                        <input type="checkbox"
                            name="isAdmin"
                            checked={this.state.isAdmin}
                            onChange={this.handleChange} /> </div>
                    <button className="btn btn-orange" disabled={!this.validateForm()}>Update user</button>
                </form>
                <hr />
            </div>
        )
    }
}


export default UserPreview;
