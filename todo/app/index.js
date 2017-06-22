import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';


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

const defaultState = {"todos":[{"id":0,"text":"Done.","completed":true},{"id":1,"text":"Not done!","completed":false},{"id":2,"text":"Not done here either..","completed":false},{"id":3,"text":"Done!","completed":true},{"id":4,"text":"Ok...","completed":false}],"visibility":"SHOW_ALL"};
const store = createStore(todoApp, defaultState);

const render = () => {
    console.log(JSON.stringify(store.getState()))
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('app')
    );
}

store.subscribe(render);
render();