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
      <form onSubmit={this.handleSubmit.bind(this)} style={{display:"inline"}}>
        <input value={this.props.username} disabled={this.state.locked} onChange={this.props.onChange} /> 
      </form>
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
          {you}
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
