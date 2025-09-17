import React from "react";
import type { Card } from "../game/utils/deck";

interface HandProps {
  playerName: string;
  hand: Card[];
}

const Hand: React.FC<HandProps> = ({ playerName, hand }) => {
  return (
    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white text-sm uppercase tracking-wide">Hand</h3>
        <span className="bg-emerald-700/50 text-emerald-100 px-2 py-1 rounded-full text-xs font-medium">
          {hand.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {hand.slice(0, 8).map((card) => (
          <img
            key={card.instanceId}
            src={card.image}
            alt={card.name}
            className="w-8 h-10 object-cover rounded border border-white/20 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
        ))}
        {hand.length > 8 && (
          <div className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium">
            +{hand.length - 8}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hand;
