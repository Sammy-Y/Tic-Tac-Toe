import classes from "./Game.module.css";
import Board from "./Board";

const Game = () => {
  return (
    <div className={classes.game}>
      Tic-Tac-Toe
      <Board />
    </div>
  );
};

export default Game;
