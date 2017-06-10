import React from 'react';
import PropTypes from 'prop-types';

class PlayerInput extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;

        this.setState(() => {
            return {
                username: value,
            };
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.onSubmit(this.props.id, this.state.username);
    }

    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>

                <input
                    id='username'
                    placeholder='Type username..'
                    type='text'
                    autoComplete='off'
                    value={this.state.username}
                    onChange={this.handleChange}
                />

                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}
                >Submit</button>
            </form>
        );
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

class Battle extends React.Component {
    constructor(props) {
        super();

        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null,
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <div className='row'>
                    {
                        ['One', 'Two'].map(id => {
                            const name = this.state[`player${id}Name`];
                            return name ? null : <PlayerInput
                                key={`player${id}`}
                                id={`player${id}`}
                                label={`Player ${id}`}
                                onSubmit={this.handleSubmit}
                            />;
                        })
                    }
                </div>
            </div>
        );
    }

    handleSubmit(id, username) {
        this.setState(() => {
            var newState = {};
            newState[`${id}Name`] = username;
            newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;

            return newState;
        });
    }
}

export default Battle;