import React from 'react';
import PropTypes from 'prop-types';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroup, FormControl } from 'react-bootstrap';
import DisplayErrors from '../DisplayErrors';
import './LoginForm.scss';
import { LOGIN_BUTTON_TEXT } from '../../utils/constants';
import CustomButton from '../CustomButton/CustomButton';

const LoginForm = props => {
  return (
    <div className="login-form">
      <form onSubmit={props.handleSubmit} autoComplete="off">
        <div className="login-form">
          <DisplayErrors errors={props.formErrors} />
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              autoFocus
              type="email"
              placeholder="Email"
              id={props.emailFieldId}
              value={props.emailValue}
              name={props.emailFieldId}
              onChange={props.handleChange}
              onKeyDown={props.handleInvalidKeys}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="password"
              placeholder="Password"
              id={props.passwordFieldId}
              value={props.passwordValue}
              name={props.passwordFieldId}
              onChange={props.handleChange}
            />
          </InputGroup>
          <div
              className="text-right clickable create-account"
              onClick={props.redirectToSignUp}
              role="button"
              id="forgot-password-link"
            >
              Create New Account
            </div>
          <CustomButton
            disabled={props.disabled}
            isLoading={props.inProgress}
            submitFunction={props.handleSubmit}
            id="loginSubmit"
            className="btn onboarding-btn"
            text={LOGIN_BUTTON_TEXT}
            type="submit"
            isBlock
          />
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  formErrors: PropTypes.object.isRequired,
  emailValue: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  emailFieldId: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInvalidKeys: PropTypes.func.isRequired,
  passwordFieldId: PropTypes.string.isRequired,
  inProgress: PropTypes.bool.isRequired,
  redirectToSignUp: PropTypes.func.isRequired
};

export default LoginForm;
