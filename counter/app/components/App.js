import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <button onClick={this.props.onAdd}>Add counter</button>
                <button onClick={this.props.onRemove}>Remove last counter</button>

                {
                    this.props.value.map((counter, index) => {
                        return [
                            <hr />,
                            <h1>{counter}</h1>,
                            <button onClick={this.props.onUpdate.bind(null, index, 1)}>+</button>,
                            <button onClick={this.props.onUpdate.bind(null, index, -1)}>-</button>,
                        ];
                    })
                }
            </div>
        );
    }
}
