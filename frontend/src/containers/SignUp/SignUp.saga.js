import { call, put } from 'redux-saga/effects';

import ACTIONS from '../../apiConfig/actions.constants';
import { TODOS } from '../../apiConfig/api.config';
import { TODOS_ROUTE } from '../../config';
import { reverse } from 'named-urls';

function* signupSaga(action) {
  let response;
  try {
    const { props, data } = action.customData;
    response = yield call(
      window.axios.postData,
      TODOS.SIGN_UP,
      data
    );
    if (response.status === 200) {
      props.history.push(reverse(TODOS_ROUTE.LOGIN));
      yield put({
        type: ACTIONS.AUTH.SIGN_UP_SUCCESS,
        payload: response.data
      });
    } else {
      yield put({
        type: ACTIONS.AUTH.SIGN_UP_FAIL,
        payload: response.data
      });
    }
  } catch (e) {
    yield put({ type: ACTIONS.AUTH.SIGN_UP_FAIL, payload: e });
  }
}

const dummy = () => {};

export { signupSaga, dummy };
