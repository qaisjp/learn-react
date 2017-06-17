import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({onFilterUpdate}) => {
    return (
        <div>
            Update filter: 
            {
            ["SHOW_ALL", "SHOW_COMPLETED", "SHOW_PENDING"].map(filter => {
                return [
                    <button onClick={onFilterUpdate.bind(null, filter)}>{filter}</button>,
                    " ",
                ];
            })
            }
        </div>
    );
}

Filters.propTypes = {
    onFilterUpdate: PropTypes.func.isRequired,
};

class InputTodo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {text: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.text);
        this.setState({text: ""});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                Add todo, <input type="text" value={this.state.text} onChange={this.handleChange}></input>
            </form>
        );
    }
}

InputTodo.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

const TodoItem = ({id, text, completed, visibility, onToggle, onRemove}) => {
    if (completed && visibility === "SHOW_PENDING") {
        return null;
    }
                        
    if (!completed && visibility === "SHOW_COMPLETED") {
        return null;
    }
                        
    return (
        <li style={{cursor:"pointer"}}>
            <span onClick={onToggle.bind(null, id)}>
            {
                completed ? <strike>{text}</strike> : text
            }
            </span>

            <button onClick={onRemove.bind(null, id)}>x</button>
        </li>
    );
};

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    visibility: PropTypes.oneOf(["SHOW_PENDING", "SHOW_COMPLETED", "SHOW_ALL"]).isRequired,
    onToggle: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove(i, event) {
        event.preventDefault();
        this.props.onRemove(i);
    }

    render() {
        return (
            <div className='container'>
                <Filters onFilterUpdate={this.props.onFilterUpdate} />
                <InputTodo onSubmit={this.props.onAdd} />

                <ul>
                {
                    this.props.value.todos.map(todo => (
                        <TodoItem
                            {...todo}
                            key={todo.id}
                            visibility={this.props.value.visibility}
                            onToggle={this.props.onToggle}
                            onRemove={this.handleRemove}
                        />
                    ))
                }
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    value: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onFilterUpdate: PropTypes.func.isRequired,
};
