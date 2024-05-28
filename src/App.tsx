import React from 'react';
import logo from './logo.svg';
import './App.css'; 
import { useState } from 'react';

export interface ISquareProps{
  value: String;
  id: number;
  onClick: () => void;
} 
export interface IBoardProps{
  xIsNext: boolean;
  squares: Array<String>;
  onPlay: (squares: Array<String>) => void; 
}

function Square(props: ISquareProps) {
  return <button className="square" onClick={props.onClick}>{props.value}</button>
}

function Board(props: IBoardProps) {
  function handleClick(i: number) {

    if (props.squares[i] || calculateWinner(props.squares)){
      return;
    }

    const nextSquare = props.squares.slice();
    if (props.xIsNext){
      nextSquare[i] = "X";
    }else{
      nextSquare[i] = "O";
    }
    props.onPlay(nextSquare);
  }

  const winner = calculateWinner(props.squares);
  let status;

  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (props.xIsNext ? "X" : "O");
  }

  return(
  <div className='box'>
    <div className="status">{status}</div>
    <div className='boardRow'>
      <Square value={props.squares[0]} id={0} onClick={() => handleClick(0)}/>
      <Square value={props.squares[1]} id={1} onClick={() => handleClick(1)}/>
      <Square value={props.squares[2]} id={2} onClick={() => handleClick(2)}/>
    </div>

    <div className='boardRow'>
      <Square value={props.squares[3]} id={3} onClick={() => handleClick(3)}/>
      <Square value={props.squares[4]} id={4} onClick={() => handleClick(4)}/>
      <Square value={props.squares[5]} id={5} onClick={() => handleClick(5)}/>
    </div>

    <div className='boardRow'>
      <Square value={props.squares[6]} id={6} onClick={() => handleClick(6)}/>
      <Square value={props.squares[7]} id={7} onClick={() => handleClick(7)}/>
      <Square value={props.squares[8]} id={8} onClick={() => handleClick(8)}/>
    </div>
  </div>
  )
}
function calculateWinner(squares: Array<String>) {
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
  for (let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: Array<String>){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove: number){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ir al movimiento #' + move;
    } else {
      description = 'Ir al inicio del juego';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext = {xIsNext} squares={currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}