import React from "react";
import type { Card } from "../game/utils/deck";

interface HandProps {
  playerName: string;
  hand: Card[];
  isMe?: boolean; // Add a prop to know if this is your hand
}

const Hand: React.FC<HandProps> = ({ playerName, hand, isMe = false }) => {
  // Ensure hand is always an array
  const safeHand = Array.isArray(hand) ? hand : [];
  
  // Filter out empty/invalid cards for display
  const validCards = safeHand.filter(card => 
    card && (card.image || card.name || card.instanceId)
  );

  return (
    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white text-sm uppercase tracking-wide">
          {isMe ? "Your Hand" : `${playerName}'s Hand`}
        </h3>
        <span className="bg-emerald-700/50 text-emerald-100 px-2 py-1 rounded-full text-xs font-medium">
          {safeHand.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {safeHand.length === 0 && (
          <div className="text-white/60 italic text-xs">
            {isMe ? "No cards in hand" : "Cards hidden"}
          </div>
        )}

        {safeHand.slice(0, 8).map((card, index) =>
          isMe && card ? (
            <img
              key={card.instanceId || `card-${index}`}
              src={card.image}
              alt={card.name || "Card"}
              className="w-8 h-10 object-cover rounded border border-white/20 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : (
            <div
              key={`hidden-${index}`}
              className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium"
            >
              {isMe ? (card?.name?.[0] || "?") : "?"}
            </div>
          )
        )}

        {safeHand.length > 8 && (
          <div className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium">
            +{safeHand.length - 8}
          </div>
        )}
      </div>
      
      {/* Debug info - remove in production */}
      {isMe && process.env.NODE_ENV === 'development' && (
        <div className="text-white/40 text-xs mt-2">
          Valid cards: {validCards.length} / Total: {safeHand.length}
        </div>
      )}
    </div>
  );
};

export default Hand;