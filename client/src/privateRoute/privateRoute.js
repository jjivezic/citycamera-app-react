import React from 'react';
import {Redirect,Route } from 'react-router-dom';
import { sessionService } from '../sessionService/storage';
//Private router function
export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          sessionService.isAuth() !== false ? (
            <Component {...props} />
          ) : (
            <Redirect
              to="/"
            />
          )}
      />
    );
  };