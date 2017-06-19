let nextTodoID = 0;

export const addTodo = text => ({type: "ADD_TODO", text, id: nextTodoID++});
export const removeTodo = id => ({type: "REMOVE_TODO", id});
export const toggleTodo = id => ({type: "TOGGLE_TODO", id});
export const setFilter = filter => ({type: "SET_FILTER", filter});
