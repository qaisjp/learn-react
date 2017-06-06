import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>Hello, world!</div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)