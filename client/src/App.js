import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbarComponent/navbar';
import { ToastContainer } from 'react-toastify';


class App extends Component {
  render() {

    return (
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route path="/"  component={Navbar} />
        </Switch>
      </div>
    );
  }
}
//https://www.sitepoint.com/react-router-v4-complete-guide/ Protected routes
export default App;