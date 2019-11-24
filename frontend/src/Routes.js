import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PAGE } from './utils/constants';
import AuthRoute from './components/AuthRoute';
import AppliedRoute from './components/AppliedRoute';
import RedirectRoute from './components/RedirectRoute';
import PageLoader from './components/PageLoader/PageLoader';
import {
  TODOS_ROUTE,
  userSessionCookie,
} from './config';

const delayTime = 60;
// Login
const AsyncLogin = Loadable({
  loader: () => import('./containers/Login/Login'),
  loading: PageLoader,
  delay: delayTime
});

const AsyncSignUp = Loadable({
  loader: () => import('./containers/SignUp/SignUp'),
  loading: PageLoader,
  delay: delayTime
});

const AsyncQrCodes = Loadable({
  loader: () => import('./containers/Todos/Todos'),
  loading: PageLoader,
  delay: delayTime
});

const AsyncAddEditTodo = Loadable({
  loader: () => import('./containers/AddEditTodo/AddEditTodo'),
  loading: PageLoader,
  delay: delayTime
});
// Invalid Resource
const AsyncNotFound = Loadable({
  loader: () => import('./containers/NotFound'),
  loading: PageLoader,
  delay: delayTime
});

const Routes = ({ childProps }) => {
  const props = {
    ...childProps,
    sessionCookie: userSessionCookie,
    redirectionRoute: TODOS_ROUTE.TODOS.LIST
  };
  return (
    <BrowserRouter basename="">
      <>
        <Switch>
          <RedirectRoute path="/" exact component={AsyncLogin} props={props} />

          <AppliedRoute
            path={TODOS_ROUTE.SIGN_UP}
            exact
            component={AsyncSignUp}
            props={props}
          />

          <AppliedRoute
            path={TODOS_ROUTE.LOGIN}
            exact
            component={AsyncLogin}
            props={props}
          />

          <AuthRoute
            path={TODOS_ROUTE.TODOS.LIST}
            exact
            component={AsyncQrCodes}
            props={{ ...props, page: PAGE.TODOS }}
          />

          <AuthRoute
            path={TODOS_ROUTE.TODOS.ADD}
            exact
            component={AsyncAddEditTodo}
            props={{ ...props, page: PAGE.ADD_TODO }}
          />

           <AuthRoute
            path={TODOS_ROUTE.TODOS.DETAIL.MODIFY}
            exact
            component={AsyncAddEditTodo}
            props={{ ...props, page: PAGE.UPDATE_TODO }}
          />
          {/* Finally, catch all unmatched routes */}
          <Route component={AsyncNotFound} />
        </Switch>
      </>
    </BrowserRouter>
  );
};

Routes.propTypes = {
  childProps: PropTypes.element
};

Routes.defaultProps = {
  childProps: <></>
};

export default Routes;
