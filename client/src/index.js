import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './index.css';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import App from './App';

import {registerApi} from './actions/registerActions';
loadProgressBar();

const store = configureStore();
console.log('STOREEEE',store)
render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
    </Provider>
  ), document.getElementById('root'));
  

