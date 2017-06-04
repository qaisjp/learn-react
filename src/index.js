import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class HelloUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
  }

  handleChange(e) {
    this.setState({
      username: e.target.value,
    });
  }
  
  render() {
    let you;

    if (this.state.username !== "") {
      you = <span>Hey, {this.state.username}!</span>;
    }

    return <div>
      Hello, I am {this.props.me}! <br />
      What is your name? <input value={this.state.username} onChange={this.handleChange.bind(this)} /> <br />
      <br /> {you}
    </div>
  }
}

// ========================================

ReactDOM.render(
  <HelloUser me="Bob" />,
  document.getElementById('root')
);
