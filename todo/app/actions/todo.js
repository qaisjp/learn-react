import { v4 as uuid } from 'node-uuid';

export const addTodo = text => ({type: "ADD_TODO", text, id: uuid() });
export const removeTodo = id => ({type: "REMOVE_TODO", id});
export const toggleTodo = id => ({type: "TOGGLE_TODO", id});
export const setFilter = filter => ({type: "SET_FILTER", filter});
