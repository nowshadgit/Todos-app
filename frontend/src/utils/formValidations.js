import {
  getErrorString,
  EMPTY,
  INVALID,
  INVALID_PASSWORD,
  PASSWORDS_NO_MATCH
} from './errorMessages';
import { ERROR_CODES } from './errorCodes';

const checkEmail = (email, fieldName) => {
  let valid = false;
  const errors = { [fieldName]: [] };

  if (!email || !email.length) {
    errors[fieldName].push(getErrorString(fieldName, EMPTY));
    return [valid, errors];
  }

  const emailRegex = /^\w+([.]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line no-useless-escape
  valid = emailRegex.test(email.trim());

  if (!valid) {
    errors[fieldName].push(getErrorString(fieldName, INVALID));
  }

  return [valid, errors];
};

const checkPassword = (password, fieldName) => {
  const valid = false;
  const errors = { [fieldName]: [] };

  if (!password || !password.length) {
    errors[fieldName].push(getErrorString(fieldName, EMPTY));
    return [valid, errors];
  }

  return [true, errors];
};

const confirmPassword = (password, confirmPassword, fieldName) => {
  const valid = false;
  const errors = { [fieldName]: [] };
  if(password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword){
    errors[fieldName].push(getErrorString(fieldName, PASSWORDS_NO_MATCH));
    return [valid, errors];
  }
  return [true, errors];
}

const checkPasswordStrength = (password, fieldName) => {
  // Password validity rule:
  // 1. Atleast 8 characters long
  // 2. Contains atleast one lower case and one upper case letter
  // 3. Contains atleast one number
  // 4. Contains atleast one special character

  //  /^
  //    (?=.*\d) Atleast one digit
  //    (?=.*[!@#$%^&*]) Atleast one of these characters
  //    (?=.*[a-z]) Atleast one lower case character
  //    (?=.*[A-Z]) Atleast one upper case character
  //    .{8,} Atleast 8 characters long string
  //  $/
  let valid = false;
  const errors = { [fieldName]: [] };

  if (!password || !password.length) {
    errors[fieldName].push(getErrorString(fieldName, EMPTY));
    return [valid, errors];
  }

  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  valid = passwordRegex.test(password.trim());

  if (!valid) {
    errors[fieldName].push(INVALID_PASSWORD);
  }

  return [valid, errors];
};

const getErrorResMsg = (errorCode, page) => {
  const errors = { [page]: [] };
  if (!errorCode) {
    return errors;
  }
  errors[page].push(ERROR_CODES[page][errorCode]);
  return errors;
};

export { checkEmail, checkPassword, checkPasswordStrength, getErrorResMsg, confirmPassword };
