import React from 'react';
import PropTypes from 'prop-types';
import InputTodo from './InputTodo';
import TodoItem from './TodoItem';

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
        console.log(this.context)
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

App.contextTypes = {
    store: PropTypes.object
}

App.propTypes = {
    value: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onFilterUpdate: PropTypes.func.isRequired,
};
