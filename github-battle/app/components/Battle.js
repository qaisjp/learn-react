import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PlayerPreview(props) {
    return (
        <div>
            <div className="column">
                <img
                    className="avatar"
                    src={props.avatar}
                    alt={`Avatar for ${props.username}`}
                />

                <h2 className="username">@{props.username}</h2>
            </div>

            <button className="reset" onClick={props.onReset.bind(null, props.id)}>
                Reset
            </button>
        </div>
    );
}

PlayerPreview.propTypes = {
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
};

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
        this.handleReset = this.handleReset.bind(this);
    }

    render() {
        const match = this.props.match;

        return (
            <div>
                <div className='row'>
                    {
                        ['One', 'Two'].map(id => {
                            const name = this.state[`player${id}Name`];
                            return (
                                name ?
                                
                                <PlayerPreview
                                    key={`player${id}`}
                                    id={id}
                                    username={name}
                                    avatar={this.state[`player${id}Image`]}
                                    onReset={this.handleReset}
                                />
                                
                                :
                                
                                <PlayerInput
                                    key={`player${id}`}
                                    id={id}
                                    label={`Player ${id}`}
                                    onSubmit={this.handleSubmit}
                                />
                            );  
                        })
                    }

                    {
                        this.state.playerOneImage && this.state.playerTwoImage &&
                        <Link
                            className='button'
                            to={{
                                pathname: `${match.url}/results`,
                                search: `?playerOneName=${this.state.playerOneName}&playerTwoName=${this.state.playerTwoName}`
                            }}
                        >Battle</Link>
                    }
                </div>
            </div>
        );
    }

    handleReset(id) {
        this.setState({
            [`player${id}Name`]: '',
            [`player${id}Image`]: null,
        });
    }

    handleSubmit(id, username) {
        this.setState(() => {
            var newState = {};
            newState[`player${id}Name`] = username;
            newState[`player${id}Image`] = `https://github.com/${username}.png?size=200`;

            return newState;
        });
    }
}

export default Battle;