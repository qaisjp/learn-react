import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTodo: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({newTodo: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAdd(this.state.newTodo);
        this.setState({newTodo: ""});
    }

    handleDelete(i, event) {
        event.preventDefault();
        this.props.onRemove(i);
    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    Add todo, <input type="text" value={this.state.newTodo} onChange={this.handleChange}></input>
                </form>

                <ul>
                {
                    this.props.value.map(({text, completed}, i) => {
                        return (
                            <li key={i} style={{cursor:"pointer"}}>
                                <span onClick={this.props.onUpdate.bind(null, i, !completed)}>
                                {
                                    completed ? <strike>{text}</strike> : text
                                }
                                </span>
                                <button onClick={this.handleDelete.bind(this, i)}>x</button>
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    value: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};
