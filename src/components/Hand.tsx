import React from "react";
import type { Card } from "../game/utils/deck";

interface HandProps {
  playerName: string;
  hand: Card[];
  isMe?: boolean; // Add a prop to know if this is your hand
}

const Hand: React.FC<HandProps> = ({ playerName, hand, isMe = false }) => {
  return (
    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white text-sm uppercase tracking-wide">Hand</h3>
        <span className="bg-emerald-700/50 text-emerald-100 px-2 py-1 rounded-full text-xs font-medium">
          {hand.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {hand.length === 0 && !isMe && (
          <div className="text-white/60 italic text-xs">Cards hidden</div>
        )}

        {hand.slice(0, 8).map((card, index) =>
          isMe ? (
            <img
              key={card.instanceId}
              src={card.image}
              alt={card.name}
              className="w-8 h-10 object-cover rounded border border-white/20 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
            />
          ) : (
            <div
              key={index}
              className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium"
            >
              ?
            </div>
          )
        )}

        {hand.length > 8 && isMe && (
          <div className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium">
            +{hand.length - 8}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hand;
