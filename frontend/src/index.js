import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './App';
import './utils/includeBabel';
import RootSaga from './rootSaga';
import rootReducers from './rootReducer';
import AxiosWrapper from './utils/AxiosWrapper';
import { userSessionCookie } from './config';

import './styles/todosApp.scss';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
window.axios = new AxiosWrapper(userSessionCookie);
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(function*() {
  /* eslint func-names: [0] */
  yield RootSaga();
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
