/* eslint-disable react/prop-types */
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Redirect to="/login" />} />
);
