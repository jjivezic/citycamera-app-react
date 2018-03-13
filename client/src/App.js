import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/loginComponent/login';
import { Register } from './components/registerComponent/register';
import { Dashboard } from './components/dashboard/dashboard';
import { PrivateRoute } from './privateRoute/privateRoute';
import { ToastContainer } from 'react-toastify';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Welcom to city cam</h1>
        <ToastContainer />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          {/* <Route path="/:id" render = {()=> (<p> I want this text to show up for all routes other than '/dashboard', '/register' and '/register' </p>)}/> */}
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
