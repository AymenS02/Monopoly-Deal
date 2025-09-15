import React from "react";
import { cards } from "../game/data/cards"; // make sure your cards.ts exports an array

const GameBoard = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center bg-gray-200 p-4">
      <div className="w-full h-full bg-white border-2 border-gray-300 rounded-lg shadow-md overflow-y-scroll p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">All Cards</h2>

        <div className="grid grid-cols-6 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-2 border rounded-lg shadow bg-gray-50 hover:bg-gray-100 transition"
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-20 h-28 object-cover mb-2"
              />
              <p className="text-sm font-medium text-center">{card.name}</p>
              {card.value !== undefined && (
                <p className="text-xs text-gray-600">Value: {card.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
