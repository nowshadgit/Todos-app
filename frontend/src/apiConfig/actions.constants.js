const ACTIONS = {
  TODOS: {
    GET_TODOS: 'GET_TODOS',
    GET_TODOS_SUCCESS: 'GET_TODOS_SUCCESS',
    GET_TODOS_FAIL: 'GET_TODOS_FAIL',

    GET_TODO_DETAILS: 'GET_TODOS_DETAILS',
    GET_TODO_DETAILS_SUCCESS: 'GET_TODO_DETAILS_SUCCESS',
    GET_TODO_DETAILS_FAIL: 'GET_TODO_DETAILS_FAIL',

    ADD_TODO: 'ADD_TODO',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_FAIL: 'ADD_TODO_FAIL',

    UPDATE_TODO: 'UPDATE_TODO',
    UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
    UPDATE_TODO_FAIL: 'UPDATE_TODO_FAIL',

    DELETE_TODO: 'DELETE_TODO',
    DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',
    DELETE_TODO_FAIL: 'DELETE_TODO_FAIL',

    RESET_STATE: 'RESET_STATE'
  },

  AUTH: {
    LOGIN: 'LOGIN',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',

    SIGN_UP: 'SIGN_UP',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAIL: 'SIGN_UP_FAIL',

    LOGOUT: 'LOGOUT',
    LOGOUT_FAIL: 'LOGOUT_FAIL',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

    INVALID_USER: 'INVALID_USER',
    RESET_STATE: 'RESET_STATE'
  },
};

export default ACTIONS;