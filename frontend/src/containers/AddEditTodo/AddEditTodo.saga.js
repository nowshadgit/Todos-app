import { call, put } from 'redux-saga/effects';
import ACTIONS from '../../apiConfig/actions.constants';
import { TODOS } from '../../apiConfig/api.config';
import { reverse } from 'named-urls';

function* addTodo(action) {
  let response;
  try {
    const { data, props} = action.data;
    response = yield call(
      window.axios.postData,
      TODOS.ADD_TODO,
      data
    );

    if (response.status === 201 || response.status === 200) {
      yield put({
        type: ACTIONS.TODOS.ADD_TODO_SUCCESS,
        payload: response.data
      });
      props.history.goBack();
    } else {
      yield put({
        type: ACTIONS.TODOS.ADD_TODO_FAIL,
        payload: response.data
      });
    }
  } catch (e) {
    yield put({ type: ACTIONS.TODOS.ADD_TODO_FAIL, payload: e });
  }
}

function* updateTodo(action) {
  let response;
  try {
    const { data, props} = action.data;
    const { history, match} = props;
    const {todoId} = match.params;
    response = yield call(
      window.axios.putData,
      reverse(TODOS.UPDATE_TODO, {todoId}),
      data
    );

    if (response.status === 201 || response.status === 200) {
      history.goBack();
      yield put({
        type: ACTIONS.TODOS.UPDATE_TODO_SUCCESS,
        payload: { callStatus: true }
      });
    } else {
      yield put({
        type: ACTIONS.TODOS.UPDATE_TODO_FAIL,
        payload: response.data
      });
    }
  } catch (e) {
    yield put({ type: ACTIONS.TODOS.UPDATE_TODO_FAIL, payload: e });
  }
}

function* getTodoDetails(action) {
  let response;
  try {
    const { todoId } = action.data;
    response = yield call(window.axios.getData, reverse(TODOS.GET_TODO_DETAILS, {todoId}));
    if (response.status === 200) {
      yield put({
        type: ACTIONS.TODOS.GET_TODO_DETAILS_SUCCESS,
        payload: response.data
      });
    } else {
      yield put({
        type: ACTIONS.TODOS.GET_TODO_DETAILS_FAIL,
        payload: response.data
      });
     
    }
  } catch (e) {
    yield put({ type: ACTIONS.TODOS.GET_TODO_DETAILS_FAIL, payload: e });
  
  }
}

const dummy = {};

export {updateTodo, addTodo, dummy, getTodoDetails };
