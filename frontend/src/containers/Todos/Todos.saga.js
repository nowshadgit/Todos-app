import { call, put } from 'redux-saga/effects';
import ACTIONS from '../../apiConfig/actions.constants';
import { TODOS } from '../../apiConfig/api.config';
import { reverse } from 'named-urls';

function* getTodos(action) {
  let response;
  try {
    const { limit, offset, location } = action.data;
    const url = `${
      TODOS.GET_TODOS
    }?limit=${limit}&offset=${offset}`;
    response = yield call(window.axios.getData, url);
    if (response.status === 200) {
      yield put({
        type: ACTIONS.TODOS.GET_TODOS_SUCCESS,
        payload: response.data
      });
    } else {
      yield put({
        type: ACTIONS.TODOS.GET_TODOS_FAIL,
        payload: response.data
      });
     
    }
  } catch (e) {
    yield put({ type: ACTIONS.ACTIONS.TODOS.GET_TODOS_FAIL, payload: e });
    
  }
}

function* deleteTodo(action) {
  let response;
  try {
    const { todoId } = action.data;
    response = yield call(window.axios.deleteData, reverse(TODOS.DELETE_TODO, {todoId}));
    if (response.status === 200) {
      yield put({
        type: ACTIONS.TODOS.DELETE_TODO_SUCCESS,
        payload: response.data
      });
      yield put({
        type: ACTIONS.TODOS.GET_TODOS,
        data: {
          limit: 10,
          offset:0,
        }
      })
    } else {
      yield put({
        type: ACTIONS.TODOS.DELETE_TODO_FAIL,
        payload: response.data
      });
     
    }
  } catch (e) {
    yield put({ type: ACTIONS.ACTIONS.TODOS.DELETE_TODO_FAIL, payload: e });
    
  }
}


const dummy = () => {};

export { getTodos, dummy, deleteTodo };
