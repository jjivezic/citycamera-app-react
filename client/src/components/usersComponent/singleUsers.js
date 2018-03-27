import React from 'react';
import { adminService } from '../../services/index';
import { Link} from 'react-router-dom';

class UserPreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
        }
    }

    getUserById(user) {
        adminService.adminGetUserById(user).then(response => {
            this.setState({ user: response.data });
        }).catch(error => {
            console.log('error admin getListOfUsers', error);
        });
    }
    componentWillMount() {
        this.onRouteChanged();
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }
    onRouteChanged() {
        console.log("ROUTE CHANGED");
        let userId = this.props.match.params.userId;
        this.getUserById(userId);
    }
    
    render() {
        let user = this.state.user;
        return (
            <div>
                <hr />
                <h5>User details</h5>
                <Link to={"/dashboard/users"}>Back to list</Link>
                <hr />
                <h1>{user.username}</h1>
                <h5>{user.email}</h5>
                <hr />
            </div>
        )
    }
}


export default UserPreview;
