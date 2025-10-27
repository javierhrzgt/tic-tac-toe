import { useState } from 'react';

type Player = 'X' | 'O';
type Square = Player | null;
type squares = Square[];
type onSquareClick = () => void;
type numberType = number;
type xIsNext = boolean;
type onPlay = (squares: Square[]) => void;
type nextSquares = Square[];

function Square({value,onSquareClick,}:{value: Square;onSquareClick: onSquareClick}) {
  return (
    <button className="size-24 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 font-bold rounded-sm text-7xl px-0 py-0 text-center me-0 mb-0 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={onSquareClick}>
      {value}
    </button>
  )
}

const Board = ({xIsNext,squares,onPlay}:{xIsNext:xIsNext, squares:squares, onPlay:onPlay}) => {
  const handleClick =(i:numberType) =>{
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares =  squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  let textColor;
  if (winner){
    status = "Winner: " + winner;
    textColor = 'text-green-500 font-bold'
  }else{
    status ="Next player: " + (xIsNext ? 'X' : 'O');
    textColor = 'text-gray-400';

  }

  return (
    <>
      <div className={`${textColor} text-3xl`}>{status}</div>
      <div className='grid grid-cols-3'>
        <Square value={squares[0]} onSquareClick={()=> handleClick(0)} />
        <Square value={squares[1]} onSquareClick={()=> handleClick(1)} />
        <Square value={squares[2]} onSquareClick={()=> handleClick(2)} />
        <Square value={squares[3]} onSquareClick={()=> handleClick(3)} />
        <Square value={squares[4]} onSquareClick={()=> handleClick(4)} />
        <Square value={squares[5]} onSquareClick={()=> handleClick(5)} />
        <Square value={squares[6]} onSquareClick={()=> handleClick(6)} />
        <Square value={squares[7]} onSquareClick={()=> handleClick(7)} />
        <Square value={squares[8]} onSquareClick={()=> handleClick(8)} />
      </div>
    </>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay=(nextSquares:nextSquares) =>{
    const nextHistory = [...history.slice(0,currentMove +1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }
  const jumpTo=(nextMove:numberType)=>{
    setCurrentMove(nextMove);
  };

  const moves = history.map((_,move)=>{
    let description;
    if(move >0){
      description = 'Go to move # ' + move;
    }else{
      description = 'Go to game start';
    }
    return(
      <li className="p-1 " key={move}>
        <button
          className="bg-white w-40 text-gray-900 p-1 rounded-sm "
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return(
    <div className="flex flex-row h-screen gap-4 justify-center items-center">
      <div className="flex flex-col gap-0.5 items-center">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='flex items-center'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

const calculateWinner = (squares: Square[]): Player | null => {
    const lines= [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }