import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Login from '../loginComponent/login';
import Register from '../registerComponent/register';
import Lending from '../lendingComponent/lending';
import { PrivateRoute } from '../../privateRoute/privateRoute';
import Dashboard from '../dashboardComponent/dashboard';
import { sessionService } from '../../sessionService/storage';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAutentificated: false
        }
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        this.isAdmin();
    }

    componentWillReceiveProps() {
        this.isAdmin();
    }
    isAdmin() {
        if (sessionService.isAuth()) {
            this.setState({ isAutentificated: true });
        } else {
            this.setState({ isAutentificated: false });
        }
    }
    logout() {
        sessionService.destroy();

    }
    render() {
        const isAutentificated = this.state.isAutentificated;
        return (
            <div>


                <nav className="navbar navbar-expand-lg navbar-light">
                    <NavLink className="navbar-brand" to="/"><i className="fa fa-camera"></i>CityCam</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="nav navbar-nav mr-auto">
                            {isAutentificated ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName='activeNavLink' to="/dashboard/folder">Dashboard</NavLink>
                                </li> : null} </ul>
                        <ul className="nav navbar-nav ml-auto">
                            {!isAutentificated ? <li className="nav-item ">
                                <NavLink className="nav-link" activeClassName='activeNavLink' to="/login" exact><i className="fa fa-sign-in" aria-hidden="true"></i>Login</NavLink>
                            </li> : null}
                            {!isAutentificated ? <li className="nav-item">
                                <NavLink className="nav-link" activeClassName='activeNavLink' to="/register"><i className="fa fa-user" aria-hidden="true"></i>Register</NavLink>
                            </li> : null}
                            {isAutentificated ?
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" className="nav-link" onClick={this.logout} >Logout</NavLink>
                                </li> : null}
                        </ul>

                    </div>
                </nav>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route path="/" component={Lending} />
                </Switch>
            </div >
        )
    }
}
export default Navbar;