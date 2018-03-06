import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch,Redirect } from 'react-router-dom';
import { Login  } from './components/loginComponent/login';
import { Register } from './components/registerComponent/register';
import { Dashboard } from './components/dashboard/dashboard';
import { sessionStorage } from './sessionStorage/storage';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Welcom to city cam</h1>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
           <Route path="/dashboard" component={Dashboard} />
         {/*<PrivateRoute path="/dashboard" component={Dashboard} />*/}
        </Switch>
      </div>
    );
  }
}

//Private router function
/*const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        sessionStorage.isAuth() === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )}
    />
  );
};*/
export default App;
