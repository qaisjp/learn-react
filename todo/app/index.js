import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';

import App from './components/App';

const addTodo = (state, text) => {
    const completed = false;
    return [...state, {text, completed}];
}

const updateTodo = (state, id, completed) => {
    return [
        ...state.slice(0, id),
        Object.assign({}, state[id], {completed}),
        ...state.slice(id+1),
    ]
}

const removeTodo = (state, id) => {
    return [
        ...state.slice(0, id),
        ...state.slice(id+1),
    ]
}

const todo = (state = [], action) => {
    switch (action.type) {
    case 'ADD_TODO':
        return addTodo(state, action.text);
    case 'REMOVE_TODO':
        return removeTodo(state, action.id);
    case 'UPDATE_TODO':
        return updateTodo(state, action.id, action.completed);
    default:
        return state;
    }
};

const store = createStore(todo);
const render = () => {
    ReactDOM.render(
        <App
            value={store.getState()}
            onAdd={text => store.dispatch({type: "ADD_TODO", text})}
            onRemove={id => store.dispatch({type: "REMOVE_TODO", id})}
            onUpdate={(id, completed) => store.dispatch({type: "UPDATE_TODO", id, completed})
            }
        />,
        document.getElementById('app')
    );
}

store.subscribe(render);
render();