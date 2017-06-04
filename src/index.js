import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class HelloUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '@qaisjp',
    };
  }

  handleChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  render() {
    return <div>
      Hello, {this.state.username}! <br />
      Would you like to change your name? <input value={this.state.username} onChange={this.handleChange.bind(this)} />
    </div>
  }
}

// ========================================

ReactDOM.render(
  <HelloUser />,
  document.getElementById('root')
);
