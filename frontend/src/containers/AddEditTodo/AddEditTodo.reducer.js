import ACTIONS from '../../apiConfig/actions.constants';

const initialState = {
  errorCode: '',
  inProgress: false
};

const addEditTodoReducerStore = (stateParam, { type, payload }) => {
  const state = stateParam || initialState;
  switch (type) {
    case ACTIONS.TODOS.ADD_TODO:
      return { ...state, data: payload, inProgress: true };
    case ACTIONS.TODOS.ADD_TODO_SUCCESS:
      return { ...state, data: payload, inProgress: false };
    case ACTIONS.TODOS.ADD_TODO_FAIL:
      return { ...state, errorCode: payload.error_code, inProgress: false };

    case ACTIONS.TODOS.UPDATE_TODO:
      return { ...state, data: payload, inProgress: true };
    case ACTIONS.TODOS.UPDATE_TODO_SUCCESS:
      return { ...state, data: payload, inProgress: false };
    case ACTIONS.TODOS.UPDATE_TODO_FAIL:
      return { ...state, errorCode: payload.error_code, inProgress: false };

    case ACTIONS.TODOS.GET_TODO_DETAILS:
      return { ...state, data: payload, inProgress: true };
    case ACTIONS.TODOS.GET_TODO_DETAILS_SUCCESS:
      return { ...state, data: payload, inProgress: false };
    case ACTIONS.TODOS.GET_TODO_DETAILS_FAIL:
      return { ...state, data: payload, inProgress: false };

    case ACTIONS.TODOS.RESET_STATE:
      return { ...state, errorCode: '' };

    default:
      return state;
  }
};

const dummy = () => {};

export { addEditTodoReducerStore, dummy };
