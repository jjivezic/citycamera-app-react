import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {Login} from '../loginComponent/login';

export class Register extends React.Component {
  render() {
    return (
      <div className="register-page">
          <h1>Register page</h1>
          <form>
            <br/>
            Useremail:<input type="text"/>
              <br/>
              <br/>
            Username:<input type="text"/>
              <br/>
            Password:<input type="text"/>
             <br/>
            <button>Login</button>
          </form>
            <Router>
                    <Link to="/login">Back to login</Link>
            </Router>
    
      </div>
    );
  }
}
