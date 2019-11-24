const EMPTY = 'is required';
const INVALID = 'is not valid';
const MIN_LENGTH = 'must have atleast 3 characters';
const INVALID_LOGIN = 'Username or password is invalid';
const INVALID_CHARACTERS = 'Special characters are not allowed';
const INVALID_PASSWORD =
  'Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number';
const PASSWORDS_NO_MATCH = 'Passwords should match';
const CONNECTION_ERROR = 'Please check your internet connection!';
const INTERNAL_SERVER = 'An error occurred, Please try again';
const TOKEN_EXPIRED = 'Your Token Has Been Expired, Please Try Again.';
const OLD_NEW_PASSWORD_SAME = 'Old password and new passwords are same.';
const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
const EMAIL_EXIST = 'User with this email address already exists.';
const getErrorString = (prefix, errorMessageCode) => {
  return `${prefix} ${errorMessageCode}`;
};

export {
  EMPTY,
  INVALID,
  MIN_LENGTH,
  INVALID_LOGIN,
  getErrorString,
  INVALID_PASSWORD,
  INVALID_CHARACTERS,
  PASSWORDS_NO_MATCH,
  CONNECTION_ERROR,
  INTERNAL_SERVER,
  TOKEN_EXPIRED,
  OLD_NEW_PASSWORD_SAME,
  DEFAULT_ERROR_MESSAGE,
  EMAIL_EXIST
};
