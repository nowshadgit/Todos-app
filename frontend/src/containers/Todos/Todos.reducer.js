import ACTIONS from '../../apiConfig/actions.constants';

const initialState = {
  data: [],
  errorCode: '',
  inProgress: false
};

const todosReducerStore = (stateParam, { type, payload }) => {
  const state = stateParam || initialState;
  switch (type) {
    case ACTIONS.TODOS.GET_TODOS:
      return { ...state, data: payload, inProgress: true };
    case ACTIONS.TODOS.GET_TODOS_SUCCESS:
      return { ...state, data: payload, inProgress: false };
    case ACTIONS.TODOS.GET_TODOS_FAIL:
      return { ...state, data: payload, inProgress: false };

    case ACTIONS.TODOS.GET_TODO_DETAILS:
      return { ...state, data: payload, inProgress: true };
    case ACTIONS.TODOS.GET_TODO_DETAILS_SUCCESS:
      return { ...state, data: payload, inProgress: false };
    case ACTIONS.TODOS.GET_TODO_DETAILS_FAIL:
      return { ...state, data: payload, inProgress: false };

    default:
      return state;
  }
};

const dummy = () => {};

export { todosReducerStore, dummy };
