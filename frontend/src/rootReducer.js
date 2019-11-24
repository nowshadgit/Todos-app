import { combineReducers } from 'redux';
import { loginStore } from './containers/Login/Login.reducer';
import { signupStore } from './containers/SignUp/SignUp.reducer';
import { todosReducerStore } from './containers/Todos/Todos.reducer';
import { addEditTodoReducerStore } from './containers/AddEditTodo/AddEditTodo.reducer';
/* Import all the reducers and combine them here */
const rootReducer = combineReducers({
  loginStore,
  signupStore,
  todosReducerStore,
  addEditTodoReducerStore
});

export default rootReducer;
