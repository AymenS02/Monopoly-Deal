// import { cards } from "../game/data/cards"; // make sure your cards.ts exports an array

type BoardProps = {
  turn: number;
};

const Board = ({ turn }: BoardProps) => {
  return (
    <div className="h-full flex flex-col items-center p-6">
      <div className="flex justify-center items-start mb-6 gap-6">
        <div className="p-6 h-80 bg-red-400">deck</div>
        <div className="p-6 h-80 bg-red-400">discard pile</div>
      </div>

      <div className="h-full flex justify-around items-start mb-6 gap-6">
        <div className="bg-green-600 h-min w-1/6 p-6">
          <h2 className="text-xl font-bold mb-4">Player 1</h2>
          <p className="mt-4">Properties</p>
          <p className="mt-4">Bank</p>
        </div>

        <div className="bg-green-600 h-min w-1/6 p-6">
          <h2 className="text-xl font-bold mb-4">Player 2</h2>
          <p className="mt-4">Properties</p>
          <p className="mt-4">Bank</p>
        </div>

        <div className="bg-green-600 h-min w-1/6 p-6">
          <h2 className="text-xl font-bold mb-4">Player 3</h2>
          <p className="mt-4">Properties</p>
          <p className="mt-4">Bank</p>
        </div>

        <div className="bg-green-600 h-min w-1/6 p-6">
          <h2 className="text-xl font-bold mb-4">Player 4</h2>
          <p className="mt-4">Properties</p>
          <p className="mt-4">Bank</p>
        </div>

        <div className="bg-green-600 h-min w-1/6 p-6">
          <h2 className="text-xl font-bold mb-4">Player 5</h2>
          <p className="mt-4">Properties</p>
          <p className="mt-4">Bank</p>
        </div>

      </div>
    </div>

  );
};

export default Board;