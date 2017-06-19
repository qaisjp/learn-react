import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todo';

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

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit(text) { dispatch(addTodo(text)) }
});

export default connect(null, mapDispatchToProps)(InputTodo);

InputTodo.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}