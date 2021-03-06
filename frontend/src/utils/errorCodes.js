import {
  CONNECTION_ERROR,
  INTERNAL_SERVER,
  EMAIL_EXIST
} from './errorMessages';
import { PAGE } from './constants';

const ERROR_CODES = {
  [PAGE.SIGN_UP]: {
    1500: INTERNAL_SERVER,
    1530: CONNECTION_ERROR
  },
  [PAGE.LOGIN]: {
    1016: EMAIL_EXIST,
    1500: INTERNAL_SERVER,
    1530: CONNECTION_ERROR
  },
  [PAGE.TODOS]: {
    1500: INTERNAL_SERVER,
    1530: CONNECTION_ERROR
  },
  [PAGE.ADD_TODO]: {
    1500: INTERNAL_SERVER,
    1530: CONNECTION_ERROR
  },
  [PAGE.UPDATE_TODO]: {
    1500: INTERNAL_SERVER,
    1530: CONNECTION_ERROR
  },
};

const dummy = () => {};

export { ERROR_CODES, dummy };
