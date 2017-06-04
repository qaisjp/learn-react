import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button> 
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}  
    />;
  }

  render() {
    let rows = [];

    for (var row = 0; row < 3; row++) {
      let squares = [];
      for (var sq = 0; sq < 3; sq++) {
        squares[sq] = this.renderSquare((3 * row) + sq);
      }

      rows[row] = <div key={row} className="board-row">{squares}</div>;
    }

    return <div>{rows}</div>;
  }
}

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      next: 'X',
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      alert(calculateWinner(squares) ? 'Game is over.' : 'That cell is already filled.')
      return;
    }

    squares[i] = this.state.next

    this.setState({
      history: history.concat({
        squares,
      }),
      stepNumber: history.length,
      next: (this.state.next === 'O') ? 'X' : 'O',
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      next: (step % 2) ? 'O' : 'X',
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let desc = (move !== 0) ?
        'Move #' + move :
        'Game start';

      if (move === this.state.stepNumber) {
        desc = <strong>{desc}</strong>
      }

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.next}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);