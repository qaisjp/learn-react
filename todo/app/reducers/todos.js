import { combineReducers } from 'redux';

const toggleTodo = (todo, id) => {
    if (todo.id !== id) {
        return todo;
    }

    return {...todo, completed: !todo.completed};
}

const todo = (state, action) => {
    switch(action.type) {
    case 'ADD_TODO':
        return {id: action.id, text: action.text, completed: false};
    case 'TOGGLE_TODO':
        return toggleTodo(state, action.id);
    }
}

const removeTodo = (state, id) => {
    var newState = Object.assign({}, state);
    delete newState[id];
    return newState;
}

const byID = (state = {}, action) => {
    switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
        return {
            ...state,
            [action.id]: todo(state[action.id], action)
        };
    case 'REMOVE_TODO':
        return removeTodo(state, action.id);
    default:
        return state;
    }
};

const allIDs = (state = [], action) => {
    switch (action.type) {
    case 'ADD_TODO':
        return [...state, action.id];
    case 'REMOVE_TODO':
        return [
            ...state.slice(0, state.indexOf(action.id)),
            ...state.slice(state.indexOf(action.id)+1)
        ];
    default:
        return state;
    }
}

export const getAllTodos = (state) => state.allIDs.map(id => state.byID[id])

export default combineReducers({byID, allIDs});