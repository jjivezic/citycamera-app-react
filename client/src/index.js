import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './index.css';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css'
import App from './App';
loadProgressBar();
render((
  
    <Router>
      <App />
    </Router>
  ), document.getElementById('root'));
  

