import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Naming extends React.Component {
  constructor() {
    super();
    this.state = {
      locked: false,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      locked: true,
    });

    this.props.onSubmit(e);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="form-inline">
        <input value={this.props.username} disabled={this.state.locked} onChange={this.props.onChange} /> 
      </form>
    );
  }
}

class FriendsModule extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      friends: this.state.friends.concat([this.state.newFriend]),
    })

    this.refs.input.value = ''
  }

  handleChange(e) {
    this.setState({
      newFriend: e.target.value,
    });
  }

  render() {
    const friends = this.state.friends.map((name, importance) => {
      return (
        // Importance here is essentially the uhhh.. index.
        <li key={importance} >{name}</li>
      );
    });

    return (
      <div>
        ...
        <br/>

        Well, go on, tell me!
        <br/>

        <form onSubmit={this.handleSubmit.bind(this)} className="form-inline">
          <input onChange={this.handleChange.bind(this)} ref="input" />
        </form>

        <ol>
          {friends}
        </ol>
      </div>
    );
  }
}

class HelloUser extends React.Component {
  constructor() {
    super();
    this.state = {
      question: 1,
      username: '',
    };
  }

  handleChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  progress() {
    this.setState({
      question: this.state.question + 1,
    });
  }
  
  render() {
    let you;

    if (this.state.username !== "") {
      you = <span>Hey, {this.state.username}!</span>;
    }

    const questions = [null,
      (
        <div>
          Hello, I am {this.props.me}!
          <br/>
          What is your name? <Naming
            username={this.state.username}
            onChange={e => this.handleChangeUsername(e)}
            onSubmit={e => this.progress()}
          />
          <br/><br/>
          {you}
        </div>
      ),

      (
        <div>
          {you} Tell me a little bit about your friends... do you have any?
          <br/>

          <FriendsModule />
        </div>
      )
    ];

    return (
        <div>
          You are on Question #{this.state.question}.
          <hr/>

          {questions[this.state.question]}
        </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <HelloUser me="Bob" />,
  document.getElementById('root')
);
