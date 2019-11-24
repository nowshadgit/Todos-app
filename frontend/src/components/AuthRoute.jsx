/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import NavBar from './Navbar/Navbar';
import { getSession, handleUrl } from '../utils/authService';

const AuthRoute = ({
  component: C,
  props: cProps,
  pageNotFound: notFound,
  ...rest
}) => {
  let firstName = '';
  let lastName = '';
  const sessionData = getSession(cProps.sessionCookie);
  const { page } = cProps;
  const fullName =
    (firstName && firstName.length > 0) || (lastName && lastName.length > 0)
      ? `${firstName} ${lastName}`
      : 'User';

  const authorizedComponent = <>
    <NavBar userName="Nowshad" />
    <div className="row pt-3">
      <div className="col col-2"></div>
      <div className="col col-7">
        <Route
            {...rest}
            render={props => <C {...props} {...cProps} inProgress />}
          />
      </div>
      <div className="col col-2"></div>
      
    </div>
</>
  return <>{handleUrl(authorizedComponent)}</>;
};
export default AuthRoute;
