// import { cards } from "../game/data/cards"; // make sure your cards.ts exports an array
import Board from "../components/Board";

const Game = () => {


  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-green-800 to-green-900 ">
        <div className="m-20 ">
          <Board />
        </div>
    </div>
  );
};

export default Game;