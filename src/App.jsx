import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const SquareBox = ({ value, onClick }) => {
  return (
    <button className="squarebox" onClick={onClick}>
      {value}
    </button>
  );
};
function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("");

  const getWinner = (squares) => {
    const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningPattern.length; i++) {
      const [x, y, z] = winningPattern[i];
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  };

  const handleClick = (getCurrentSquare) => {
    let cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
    cpySquares[getCurrentSquare] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquares(cpySquares);
  };

  const handleRestart = () => {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));
  };
  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== "")) {
      setStatus(`This is a draw! Please restart the game.`);
    } else if (getWinner(squares)) {
      setStatus(`Winner is ${getWinner(squares)}! Please restart the game.`);
    } else {
      setStatus(`Now the player is ${isXTurn ? "X" : "O"}`);
    }
  }, [squares, isXTurn]);
  return (
    <>
      <div className="tic-tac-toe-container">
        <div className="row">
          <SquareBox value={squares[0]} onClick={() => handleClick(0)} />
          <SquareBox value={squares[1]} onClick={() => handleClick(1)} />
          <SquareBox value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <SquareBox value={squares[3]} onClick={() => handleClick(3)} />
          <SquareBox value={squares[4]} onClick={() => handleClick(4)} />
          <SquareBox value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <SquareBox value={squares[6]} onClick={() => handleClick(6)} />
          <SquareBox value={squares[7]} onClick={() => handleClick(7)} />
          <SquareBox value={squares[8]} onClick={() => handleClick(8)} />
        </div>
        <h1>{status}</h1>
        <button className="restart" onClick={handleRestart}>Reastart</button>
      </div>
    </>
  );
}

export default App;
