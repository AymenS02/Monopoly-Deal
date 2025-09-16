// import { cards } from "../game/data/cards"; // make sure your cards.ts exports an array
import Board from "../components/Board";
import { useState } from "react";

const Game = () => {

  const [turn, setTurn] = useState(0); // Placeholder for turn state management

  const nextTurn = () => {
    setTurn((prevTurn) => (prevTurn + 1) % 5); // Cycle through 5 players
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-green-800 to-green-900 ">
        <div className="m-20 bg-green-700">
          <Board turn={turn} />
          <button onClick={nextTurn} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Next Turn
          </button>
        </div>
    </div>
  );
};

export default Game;