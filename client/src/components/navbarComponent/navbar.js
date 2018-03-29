import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Login from '../loginComponent/login';
import Register from '../registerComponent/register';
import Lending from '../lendingComponent/lending';
import { PrivateRoute } from '../../privateRoute/privateRoute';
import PageNotFound from '../pageNotFound/pageNotFound';
import Dashboard from '../dashboardComponent/dashboard';
import { sessionService } from '../../sessionService/storage';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAutentificated: false
        }
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
    render() {
        const isAutentificated = this.state.isAutentificated;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" activeclassname='activeNavLink' to="/">CityCam</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {!isAutentificated ? <li className="nav-item ">
                                <NavLink className="nav-link"  activeclassname='activeNavLink' to="/login" exact>Login</NavLink>
                            </li> : null}
                            {!isAutentificated ? <li className="nav-item">
                                <NavLink  className="nav-link"  activeclassname='activeNavLink' to="/register">Register</NavLink>
                            </li> : null}
                            {isAutentificated ?
                                <li className="nav-item">
                                    <NavLink  className="nav-link" activeclassname='activeNavLink' to="/dashboard/folder">Dashboard</NavLink>
                                </li> : null}

                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {isAutentificated ?
                                <li className="nav-item">
                                    <a href="#" className="nav-link"  className="nav-link" activeclassname='activeNavLink' onClick={() => { sessionService.destroy() }} >Logout</a>
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