import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import './index.css';

import App from './components/App';

let nextTodoID = 0;

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
        return {id: nextTodoID++, text: action.text, completed: false};
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

const store = createStore(todoApp);
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App
                value={store.getState()}
                onAdd={text => store.dispatch({type: "ADD_TODO", text})}
                onRemove={id => store.dispatch({type: "REMOVE_TODO", id})}
                onToggle={id => store.dispatch({type: "TOGGLE_TODO", id})}
                onFilterUpdate={filter => store.dispatch({type: "SET_FILTER", filter})}
            />
        </Provider>,
        document.getElementById('app')
    );
}

store.subscribe(render);
render();