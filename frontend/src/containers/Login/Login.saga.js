import { call, put } from 'redux-saga/effects';

import ACTIONS from '../../apiConfig/actions.constants';
import {TODOS } from '../../apiConfig/api.config';

function* loginSaga(action) {
  let response;
  try {
    response = yield call(
      window.axios.postData,
      TODOS.LOGIN,
      action.data
    );
    if (response.status === 200) {
      yield put({
        type: ACTIONS.AUTH.LOGIN_SUCCESS,
        payload: response.data
      });
    } else {
      yield put({
        type: ACTIONS.AUTH.LOGIN_FAIL,
        payload: response.data
      });
    }
  } catch (e) {
    yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, payload: e });
  }
}

const dummy = () => {};

export { loginSaga, dummy };
