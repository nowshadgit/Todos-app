import { reverse } from 'named-urls';
import { PAGE, TODOS, ADD, ADD_TODO, UPDATE_TODO } from './constants';
import { TODOS_ROUTE } from '../config';

import {
  redirect,
} from './common';
import ACTIONS from '../apiConfig/actions.constants';

export default {
  [PAGE.TODOS]: {
    pageTitle: TODOS,
    headerActions: [
        {
          text: ADD,
          handler: redirect,
        }
      ],
    redirect: {
      [ADD]: reverse(TODOS_ROUTE.TODOS.ADD)
    },
  },

  [PAGE.ADD_TODO]: {
    pageTitle: ADD_TODO,
    actions:{
      postData: reverse(ACTIONS.TODOS.ADD_TODO)
    }
  },

  [PAGE.UPDATE_TODO]: {
    pageTitle: UPDATE_TODO,
    actions:{
      postData: reverse(ACTIONS.TODOS.UPDATE_TODO)
    }
  },

};
