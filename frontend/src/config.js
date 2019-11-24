import { include } from 'named-urls';

const userSessionCookie = 'upayogakarta';


const TODOS_ROUTE = {
  LOGIN: '/login/',
  SIGN_UP: '/signup/',
  TODOS: include('/todos/', {
    LIST: '',
    ADD: 'add/',
    DETAIL: include(':todoId/', {
      SHOW: '',
      MODIFY: 'modify/'
    })
  }),
};

export {
  userSessionCookie,
  TODOS_ROUTE
};
