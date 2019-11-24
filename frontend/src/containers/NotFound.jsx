/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import NotFound from '../components/NotFound/NotFound';
import { userSessionCookie, TODOS_ROUTE } from '../config';
import { getSession } from '../utils/authService';

const NotFoundPage = props => {
  const redirectToHome = () => {
    const sessionData = getSession(userSessionCookie);
    sessionData && Object.entries(sessionData).length > 0 && sessionData.token
      ? props.history.push(TODOS_ROUTE.TODOS)
      : props.history.push(TODOS_ROUTE.LOGIN);
  };
  return (
    <div>
      <NotFound changeHandler={redirectToHome} />
    </div>
  );
};

NotFound.propTypes = {
  history: PropTypes.object
};

export default withRouter(NotFoundPage);
