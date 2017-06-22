import { combineReducers } from 'redux';

const toggleTodo = (todo, id) => {
    if (todo.id !== id) {
        return todo;
    }

    return {...todo, completed: !todo.completed};
}

const removeTodo = (state, id) => {
    return state.filter(todo => todo.id !== id);
}

const visibility = (state = "SHOW_ALL", action) => {
    switch (action.type) {
    case 'SET_FILTER':
        return action.filter;
    default:
        return state;
    }
}

const todo = (state, action) => {
    switch(action.type) {
    case 'ADD_TODO':
        return {id: action.id, text: action.text, completed: false};
    case 'TOGGLE_TODO':
        return toggleTodo(state, action.id);
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
    case 'ADD_TODO':
        return [...state, todo(undefined, action)];
    case 'REMOVE_TODO':
        return removeTodo(state, action.id);
    case 'TOGGLE_TODO':
        return state.map(t => todo(t, action));
    default:
        return state;
    }
};

const todoApp = combineReducers({todos, visibility});
export default todoApp;
