import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeTodo, toggleTodo } from '../actions/todo';

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

const mapStateToProps = (state) => ({
    visibility: state.visibility,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRemove(id) { dispatch(removeTodo(id)) },
    onToggle(id) { dispatch(toggleTodo(id)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
