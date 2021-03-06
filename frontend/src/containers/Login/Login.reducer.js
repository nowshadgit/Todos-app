import { userSessionCookie } from '../../config';
import { setSession } from '../../utils/authService';
import ACTIONS from '../../apiConfig/actions.constants';

const initialState = {
  data: {},
  error: {
    count: 0,
    message: ''
  },
  inProgress: false
};

const loginStore = (stateParam, { type, payload }) => {
  const state = stateParam || initialState;
  switch (type) {
    case ACTIONS.AUTH.LOGIN:
      return { ...state, inProgress: true };
    case ACTIONS.AUTH.LOGIN_SUCCESS:
      setSession({ ...payload.data }, userSessionCookie);
      return { ...state, data: payload, inProgress: false };
    case ACTIONS.AUTH.LOGIN_FAIL:
      return {
        ...state,
        error: { errorCode: payload.error_code, count: state.error.count + 1 },
        inProgress: false
      };
    case ACTIONS.AUTH.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

const dummy = () => {};

export { loginStore, dummy };
