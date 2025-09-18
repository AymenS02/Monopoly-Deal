import React from "react";
import type { Card } from "../game/utils/deck";
import { cardEffects } from "../game/cardEffects";

interface HandProps {
  playerName: string;
  hand: Card[];
  isMe?: boolean;
}

const Hand: React.FC<HandProps> = ({ playerName, hand, isMe = false }) => {
  const safeHand = Array.isArray(hand) ? hand : [];

  const cardClickHandler = (card: Card) => {
    if (!isMe) return;

    console.log("Card clicked:", card);

    if (card.actionEffect) {
      const effect = cardEffects[card.actionEffect];
      if (effect) {
        effect(card, playerName);
      } else {
        console.warn(`No effect function found for ${card.actionEffect}`);
      }
    }
  };

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

      <div className="flex flex-wrap gap-1 justify-evenly">
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
              className="w-auto h-36 object-cover rounded border border-white/20 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
              onClick={() => cardClickHandler(card)}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : (
            <div
              key={`hidden-${index}`}
              className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium"
            >
              {isMe ? card?.name?.[0] || "?" : "?"}
            </div>
          )
        )}

        {safeHand.length > 8 && (
          <div className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium">
            +{safeHand.length - 8}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hand;
