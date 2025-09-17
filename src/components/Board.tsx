import { useContext } from "react";
import { StoreContext } from "../game/store/context";
import type { Player } from "../game/store/gameStore";
import type { Card } from "../game/utils/deck";

const Board = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("StoreContext not provided");

  const { gameState } = context;
  const players: Player[] = gameState?.players || [];
  const deck: Card[] = gameState?.deck || [];
  const discardPile: Card[] = gameState?.discardPile || [];

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Game Center - Deck & Discard Pile */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex gap-8 p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
            {/* Deck */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 w-48 h-64 shadow-lg border border-blue-400/30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                  <div className="w-16 h-20 bg-blue-900/50 rounded-lg border-2 border-blue-300/50 mb-4 flex items-center justify-center shadow-inner">
                    <div className="w-8 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded opacity-80"></div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Deck</h3>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {deck.length} cards
                  </div>
                </div>
              </div>
            </div>

            {/* Discard Pile */}
            <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 w-48 h-64 shadow-lg border border-red-400/30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                <div className="relative z-10 flex flex-col items-center h-full text-white">
                  <h3 className="text-lg font-bold mb-3">Discard Pile</h3>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {discardPile.length} cards
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="flex -space-x-2 max-w-32">
                      {discardPile.slice(0, 3).map((card, index) => (
                        <img 
                          key={card.instanceId} 
                          src={card.image} 
                          alt={card.name} 
                          className="w-12 h-16 object-cover rounded-lg border-2 border-white/30 shadow-md transform hover:scale-110 transition-transform duration-200"
                          style={{ zIndex: 3 - index }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {players.map((player, index) => (
            <div 
              key={player.id} 
              className="group relative"
            >
              {/* Player Card */}
              <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 shadow-2xl border border-emerald-400/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Player Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white truncate">{player.name}</h2>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Player Sections */}
                  <div className="space-y-4">
                    {/* Hand */}
                    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white text-sm uppercase tracking-wide">Hand</h3>
                        <span className="bg-emerald-700/50 text-emerald-100 px-2 py-1 rounded-full text-xs font-medium">
                          {player.hand.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {player.hand.slice(0, 8).map((card) => (
                          <img 
                            key={card.instanceId} 
                            src={card.image} 
                            alt={card.name} 
                            className="w-8 h-10 object-cover rounded border border-white/20 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer" 
                          />
                        ))}
                        {player.hand.length > 8 && (
                          <div className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium">
                            +{player.hand.length - 8}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Properties */}
                    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white text-sm uppercase tracking-wide">Properties</h3>
                        <span className="bg-amber-600/50 text-amber-100 px-2 py-1 rounded-full text-xs font-medium">
                          {player.properties.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {player.properties.slice(0, 8).map((card) => (
                          <img 
                            key={card.instanceId} 
                            src={card.image} 
                            alt={card.name} 
                            className="w-8 h-10 object-cover rounded border border-white/20 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer" 
                          />
                        ))}
                        {player.properties.length > 8 && (
                          <div className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium">
                            +{player.properties.length - 8}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bank */}
                    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white text-sm uppercase tracking-wide">Bank</h3>
                        <span className="bg-yellow-600/50 text-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
                          {player.bank.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {player.bank.slice(0, 8).map((card) => (
                          <img 
                            key={card.instanceId} 
                            src={card.image} 
                            alt={card.name} 
                            className="w-8 h-10 object-cover rounded border border-white/20 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer" 
                          />
                        ))}
                        {player.bank.length > 8 && (
                          <div className="w-8 h-10 bg-white/10 rounded border border-white/20 flex items-center justify-center text-white text-xs font-medium">
                            +{player.bank.length - 8}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;