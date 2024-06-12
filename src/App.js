import { useState } from "react";


export default function Game() {
  //const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [descend, setDescend] = useState(true);
  const [historyDescend, setHistoryDescend] = useState(true);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go back to move #' + move;
    } else {
      description = 'Return to game start';
    }
    if (move === currentMove) {
      return (
      <div>
        <>Current move: {currentMove}</>
      </div>
      )
    } else {
    return (
      <div>
        <li key= {move} value= {move}>
          <button onClick={()=> jumpTo(move)}>{description}</button>
        </li>
      </div>
    )}
  })

  if (descend != historyDescend) {
    moves.reverse();
    console.log("hello");
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay = {handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <div className="order-toggle">
        <button onClick={() => setDescend(!descend)}>Toggle Move Order</button>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

    function handleClick(i) {
      if (squares[i] || calculateWinner(squares)) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }

    let board = [];
    
    board.push(<div className="status">{status}</div>);

    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        row.push(
          <Square
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            key={index}
          />
        );
      }
      board.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }

    return(
      <>
      {board}
      </>
    );
  }

  /*
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  */

  function Square({ value, onSquareClick }) {
    return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
        {value}
      </button>
    );
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
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  