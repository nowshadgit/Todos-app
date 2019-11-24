import React from 'react';
import PropTypes from 'prop-types';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroup, FormControl } from 'react-bootstrap';
import DisplayErrors from '../DisplayErrors';
import './SignUpForm.scss';
import { SIGNUP_BUTTON_TEXT } from '../../utils/constants';
import CustomButton from '../CustomButton/CustomButton';

const SignUpForm = props => {
  return (
    <div className="signup-form">
      <form onSubmit={props.handleSubmit} autoComplete="off">
        <div className="signup-form">
          <DisplayErrors errors={props.formErrors} />
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              placeholder="Full name"
              id={props.nameFieldId}
              value={props.nameFieldValue}
              name={props.nameFieldId}
              onChange={props.handleChange}
            />
          </InputGroup>
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
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="password"
              placeholder="Confirm Password"
              id={props.confirmPasswordField}
              value={props.confirmPasswordValue}
              name={props.confirmPasswordValue}
              onChange={props.handleChange}
            />
          </InputGroup>
          <CustomButton
            disabled={props.disabled}
            isLoading={props.inProgress}
            submitFunction={props.handleSubmit}
            id="signupSubmit"
            className="btn onboarding-btn"
            text={SIGNUP_BUTTON_TEXT}
            type="submit"
            isBlock
          />
        </div>
      </form>
    </div>
  );
};

SignUpForm.propTypes = {
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
  nameFieldId: PropTypes.string.isRequired,
  confirmPasswordField: PropTypes.string.isRequired,
  nameFieldValue: PropTypes.string.isRequired,
  confirmPasswordValue: PropTypes.string.isRequired,
};

export default SignUpForm;
