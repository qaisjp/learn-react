import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeTodo, toggleTodo } from '../actions/todo';
import { withRouter } from 'react-router';

const TodoItem = ({id, text, completed, visibility, onToggle, onRemove}) => {
    if (completed && visibility === "pending") {
        return null;
    }
                        
    if (!completed && visibility === "completed") {
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
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    visibility: PropTypes.oneOf(["pending", "completed", "all"]).isRequired,
    onToggle: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
}

const mapStateToProps = (_, { match }) => ({
    visibility: match.params.filter || 'all',
});


export default withRouter(connect(
    mapStateToProps,
    {
        onRemove: removeTodo,
        onToggle: toggleTodo,
    }
)(TodoItem));
