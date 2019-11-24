/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkUserLoggedIn } from '../utils/authService';

export default ({ component: C, props: cProps, ...rest }) => {
  const { redirectionRoute } = cProps;
  return checkUserLoggedIn() ? (
    <Redirect to={redirectionRoute} />
  ) : (
    <Route {...rest} render={props => <C {...props} {...cProps} />} />
  );
};
