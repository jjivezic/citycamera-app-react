import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.min.js';
import './index.css';
import App from './App';

render((
    <HashRouter>
      <App />
    </HashRouter>
  ), document.getElementById('root'));
  

