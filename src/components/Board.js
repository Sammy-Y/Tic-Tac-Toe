import { useState } from "react";

import classes from "./Board.module.css";
import Square from "./Square";

const Board = () => {
  const initialSquares = Array(9).fill(null);
  // const initialSquares = [null, null, null, null, null, null, null, null, null];
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  // calculate winner is decleared or not
  const calculateWinner = (squares) => {
    const lines = [
      //rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // 'X' or 'O'
      }
    }

    // if squares is filled and no winner
    if (!squares.includes(null)) {
      return "Peace";
    }

    return null;
  };

  const handleClickeEvent = (i) => {
    // 1. make a copy of squares of state array
    const copySquares = [...squares];

    // is Game Winner Decleared?
    const winnerDecleared = Boolean(calculateWinner(copySquares));
    // is the square filled?
    const squareFilled = Boolean(copySquares[i]);

    if (winnerDecleared || squareFilled) {
      return;
    }

    // 2. mutate the copy ,setting the i-th element to 'X'
    copySquares[i] = xIsNext ? "X" : "O";
    // 3. call the setSquares function with the mutated copy
    setSquares(copySquares);

    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return (
      <Square
        value={squares[index]}
        onClick={() => {
          handleClickeEvent(index);
        }}
      />
    );
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner ： ${winner}`
    : `Next player : ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className={classes.status}>{status}</div>
      <div className={classes.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={classes.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={classes.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
