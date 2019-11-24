import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ACTIONS from '../../apiConfig/actions.constants';
import { LOGIN_FORM_HEADER, PAGE } from '../../utils/constants';
import AsOnboardingCard from '../../hocs/AsOnbaordingCard';
import LoginForm from '../../components/LoginForm/LoginForm';
import {
  checkEmail,
  checkPassword,
  getErrorResMsg
} from '../../utils/formValidations';
import { TODOS } from '../../apiConfig/api.config';
import { TODOS_ROUTE } from '../../config';
import { reverse } from 'named-urls';

class Login extends React.Component {
  EMAIL_FIELD_ID = 'todo-email';

  PASSWORD_FIELD_ID = 'todo-password';

  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
      rememberMe: false,
      formValidity: false,
      submitDisabled: true,
      [this.EMAIL_FIELD_ID]: '',
      [this.PASSWORD_FIELD_ID]: '',
      errorCode: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { errorCode } = nextProps.login.error;
    if (errorCode && errorCode !== prevState.errorCode) {
      const errMsg = getErrorResMsg(errorCode, PAGE.LOGIN);
      return { formErrors: errMsg, errorCode };
    }
    return prevState;
  }

  enableSignIn = (email, password) => {
    const disabled = !(email.length > 0 && password.length > 0);
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
    const formValidity = emailValidity && passwordValidity;
    const formErrors = { ...emailErrors, ...passwordErrors };

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
          this.state[this.PASSWORD_FIELD_ID]
        )
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({ type: ACTIONS.AUTH.RESET_STATE });
    if (this.validateForm()) {
      const data = {
        email: this.state[this.EMAIL_FIELD_ID],
        password: this.state[this.PASSWORD_FIELD_ID]
      };
      this.login(data);
    }
  };

  login = data => {
    this.setState({ errorCode: '' });
    this.props.dispatch({ type: ACTIONS.AUTH.LOGIN, data });
  };


  redirectToSignUp =()=>{
    const { history }= this.props;
    history.push(reverse(TODOS_ROUTE.SIGN_UP));
  }

  shouldComponentUpdate(nextProps) {
    const { data } = nextProps.login;
    if (data && data.data && data.data.token) {
      this.props.history.push(reverse(TODOS_ROUTE.TODOS.LIST));
    }
    return true;
  }

  render() {
    return (
      <div className="login-container">
        <h4 className="card-title todo-card-title">{LOGIN_FORM_HEADER}</h4>
        <div className="card-text">
          <LoginForm
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
            inProgress={this.props.login.inProgress}
            redirectToSignUp={this.redirectToSignUp}
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

Login.defaultProps = {};

const mapStateToProps = state => ({
  login: state.loginStore
});

export default withRouter(connect(mapStateToProps)(AsOnboardingCard(Login)));
