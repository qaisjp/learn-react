import React from 'react';
import PropTypes from 'prop-types';
import InputTodo from './InputTodo';
import TodoItem from './TodoItem';
import FilterButtons from './FilterButtons';
import { connect } from 'react-redux';

class App extends React.Component {
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
                <FilterButtons />
                <InputTodo />

                <ul>
                {
                    this.props.todos.map(todo => (
                        <TodoItem
                            {...todo}
                            key={todo.id}
                        />
                    ))
                }
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    todos: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    todos: state.todos,
});

export default connect(mapStateToProps, null)(App);
