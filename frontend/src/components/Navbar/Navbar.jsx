import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  userSessionCookie,
} from '../../config';
import { logout } from '../../utils/authService';

import './Navbar.scss';

const Navbar = props => {
  const onSignout = () => {
    logout(userSessionCookie);
  };

  const userItem = (
    <NavDropdown
      title={props.userName}
      className="ml-auto nav-dropdown dropdown-menu-right"
      id="navbar-profile"
    >
      <NavDropdown.Item onClick={onSignout} id="navbar-logout">
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );

  return (
    <div className="fp-navbar sticky-top">
      <nav className={`navbar  navbar-expand-lg navbar-light ${props.class}`}>
        {userItem}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  class: PropTypes.string,
  userName: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  class: 'nav-1',
  userName: 'User',
};

export default withRouter(
  connect(
    null,
    null
  )(Navbar)
);
