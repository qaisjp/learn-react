import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';

import App from './components/App';

const addCounter = list => {
    return [...list, 0];
}

const removeCounter = (list, id) => {
    return [
        ...list.slice(0, id),
        ...list.slice(id+1),
    ];
}

const incrementCounter = (list, id, amount) => {
    return [
        ...list.slice(0, id),
        list[id] + amount,
        ...list.slice(id+1),
    ];
}

const counter = (state = [], action) => {
    switch (action.type) {
    case 'ADD':
        return addCounter(state);
    case 'REMOVE':
        return removeCounter(state, action.id);
    case 'UPDATE':
        return incrementCounter(state, action.id, action.amount);
    default:
        return state;
    }
};

const store = createStore(counter);
const render = () => {
    ReactDOM.render(
        <App
            value={store.getState()}
            onAdd={store.dispatch.bind(null, {type: "ADD"})}
            onRemove={store.dispatch.bind(null, {type: "REMOVE", id: store.getState().length - 1})}
            onUpdate={(id, amount) => store.dispatch({type: "UPDATE", id, amount})
            }
        />,
        document.getElementById('app')
    );
}

store.subscribe(render);
render();