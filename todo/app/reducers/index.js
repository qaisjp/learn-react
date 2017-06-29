import { combineReducers } from 'redux';
import todos, * as fromTodos  from './todos';

const todoApp = combineReducers({todos});

export const getAllTodos = state => fromTodos.getAllTodos(state.todos)

export default todoApp;
