import { all, takeEvery} from 'redux-saga/effects';

import ACTIONS from './apiConfig/actions.constants';
import { loginSaga } from './containers/Login/Login.saga';
import { addTodo, updateTodo, getTodoDetails } from './containers/AddEditTodo/AddEditTodo.saga';
import { getTodos, deleteTodo } from './containers/Todos/Todos.saga';
import { signupSaga } from './containers/SignUp/SignUp.saga';

export default () =>
  all([
    takeEvery(ACTIONS.AUTH.LOGIN, loginSaga),
    takeEvery(ACTIONS.AUTH.SIGN_UP, signupSaga),
    takeEvery(ACTIONS.TODOS.GET_TODOS, getTodos),
    takeEvery(ACTIONS.TODOS.ADD_TODO, addTodo),
    takeEvery(ACTIONS.TODOS.UPDATE_TODO, updateTodo),
    takeEvery(ACTIONS.TODOS.GET_TODO_DETAILS, getTodoDetails),
    takeEvery(ACTIONS.TODOS.DELETE_TODO, deleteTodo)
  ]);
