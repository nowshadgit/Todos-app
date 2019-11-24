import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ACTIONS from '../../apiConfig/actions.constants';
import { SIGNUP_FORM_HEADER, PAGE } from '../../utils/constants';
import AsOnboardingCard from '../../hocs/AsOnbaordingCard';
import {
  checkEmail,
  checkPassword,
  getErrorResMsg,
  confirmPassword
} from '../../utils/formValidations';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

class Singup extends React.Component {
  EMAIL_FIELD_ID = 'todo-email';

  PASSWORD_FIELD_ID = 'todo-password';

  NAME_FIELD_ID = 'todo-user-name';

  CONFIRM_PASSWORD_FIELD_ID = 'todo-confirm-password';

  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
      rememberMe: false,
      formValidity: false,
      submitDisabled: true,
      [this.EMAIL_FIELD_ID]: '',
      [this.PASSWORD_FIELD_ID]: '',
      [this.NAME_FIELD_ID]:'',
      [this.CONFIRM_PASSWORD_FIELD_ID]:'',
      errorCode: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { errorCode } = nextProps.signup.error;
    if (errorCode && errorCode !== prevState.errorCode) {
      const errMsg = getErrorResMsg(errorCode, PAGE.LOGIN);
      return { formErrors: errMsg, errorCode };
    } 
    return prevState;
  }

  enableSignIn = (email, password, confirmPassword, userName) => {
    const disabled = !(email.length > 0 && password.length > 0 && confirmPassword.length > 0 && userName.length>0);
    this.setState({ submitDisabled: disabled });
  };

  validateForm = () => {
    const [emailValidity, emailErrors] = checkEmail(
      this.state[this.EMAIL_FIELD_ID],
      'Email'
    );
    const [passwordValidity, passwordErrors] = checkPassword(
      this.state[this.PASSWORD_FIELD_ID],
      'Password'
    );

    const [confirmPasswordValidity, confirmPasswordError] = confirmPassword(
      this.state[this.PASSWORD_FIELD_ID],
      this.state[this.CONFIRM_PASSWORD_FIELD_ID],
      ''
    )
    const formValidity = emailValidity && passwordValidity && confirmPasswordValidity;
    const formErrors = { ...emailErrors, ...passwordErrors, ...confirmPasswordError };

    this.setState({ formValidity, formErrors });

    return formValidity;
  };

  handleInvalidKeys = event => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.id]: event.target.value,
        formErrors: {}
      },
      () =>
        this.enableSignIn(
          this.state[this.EMAIL_FIELD_ID],
          this.state[this.PASSWORD_FIELD_ID],
          this.state[this.CONFIRM_PASSWORD_FIELD_ID],
          this.state[this.NAME_FIELD_ID]
        )
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({ type: ACTIONS.AUTH.RESET_STATE });
    if (this.validateForm()) {
      const data = {
        email: this.state[this.EMAIL_FIELD_ID],
        password: this.state[this.PASSWORD_FIELD_ID],
        name: this.state[this.NAME_FIELD_ID]
      };
      this.signup(data);
    }
  };

  signup = data => {
    this.setState({ errorCode: '' });
    const customData = {props: this.props, data};
    this.props.dispatch({ type: ACTIONS.AUTH.SIGN_UP,  customData});
  };

  render() {
    return (
      <div className="signup-container">
        <h4 className="card-title todo-card-title">{SIGNUP_FORM_HEADER}</h4>
        <div className="card-text">
          <SignUpForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            formErrors={this.state.formErrors}
            emailFieldId={this.EMAIL_FIELD_ID}
            disabled={this.state.submitDisabled}
            formValidity={this.state.formValidity}
            passwordFieldId={this.PASSWORD_FIELD_ID}
            handleInvalidKeys={this.handleInvalidKeys}
            emailValue={this.state[this.EMAIL_FIELD_ID]}
            passwordValue={this.state[this.PASSWORD_FIELD_ID]}
            inProgress={this.props.signup.inProgress}
            nameFieldId={this.NAME_FIELD_ID}
            confirmPasswordField={this.CONFIRM_PASSWORD_FIELD_ID}
            nameFieldValue={this.state[this.NAME_FIELD_ID]}
            confirmPasswordValue={this.state[this.CONFIRM_PASSWORD_FIELD_ID]}
          />
        </div>
      </div>
    );
  }
}

Singup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signup: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

Singup.defaultProps = {};

const mapStateToProps = state => ({
  signup: state.signupStore
});

export default withRouter(connect(mapStateToProps)(AsOnboardingCard(Singup)));
