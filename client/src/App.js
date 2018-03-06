import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import {Login} from './components/loginComponent/login';
import {Register} from './components/registerComponent/register';
import {Dashboard} from './components/dashboard/dashboard'
class App extends Component {
  render() {
    return (
      <div className="App">
         <h1> Welcom to city cam</h1>
         <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
       
      </div>
    );
  }
}

export default App;
