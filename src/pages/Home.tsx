import React from "react";
import { useNavigate } from "react-router-dom";
import type { GameState, Player } from "../game/store/gameStore";
import { StoreContext } from "../game/store/context";
import { useContext } from "react";
import { cards } from "../game/data/cards";
import { createDeckFromTemplates, shuffleDeck, type Card } from "../game/utils/deck";

function Home() {
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = React.useState(2);
  const [isStarting, setIsStarting] = React.useState(false);

  // Access the global store - commented for demo
  const { setGameState } = useContext(StoreContext)!;

  const startGame = async () => {
    if (!setGameState) return;

    setIsStarting(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, just show completion
    alert(`Starting game with ${playerCount} players!`);
    setIsStarting(false);

    // Original game logic would be here:
    
    // 1. Create full deck with all duplicates
    let deck: Card[] = createDeckFromTemplates(cards);

    // 2. Shuffle the deck
    deck = shuffleDeck(deck);

    // 3. Create players and deal 5 cards each
    const players: Player[] = [];
    for (let i = 0; i < playerCount; i++) {
      const hand = deck.splice(0, 5); // remove 5 cards for this player
      players.push({
        id: i,
        name: `Player ${i + 1}`,
        hand,
        bank: [],
        properties: [],
      });
    }

    // 4. Build initial game state
    const initialGameState: GameState = {
      players,
      deck,           // remaining shuffled deck
      discardPile: [],
      currentPlayer: 0,
    };

    // 5. Save globally
    setGameState(initialGameState);

    console.log("Starting game with state:", initialGameState);
    navigate("/game");
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated background particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-emerald-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md w-full">
        {/* Game Logo/Title */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight">
              Monopoly
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-lg blur opacity-20"></div>
          </div>
          <h2 className="text-3xl font-semibold text-white/90 mb-2">Deal</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Game Description */}
        <div className="text-center mb-12">
          <p className="text-lg text-white/70 leading-relaxed">
            The fast-paced card game where you collect properties, 
            charge rent, and build your monopoly empire!
          </p>
        </div>

        {/* Game Setup Card */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Game Setup</h3>
          
          {/* Player Count Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-white/80 mb-4 text-center">
              Number of Players
            </label>
            <div className="flex items-center justify-center">
              <button
                onClick={() => setPlayerCount((count) => Math.max(count - 1, 2))}
                disabled={playerCount <= 2}
                className="group relative w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-l-xl font-bold text-xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-l-xl"></div>
                <span className="relative">−</span>
              </button>
              
              <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 px-8 py-3 border-t border-b border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{playerCount}</div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Players</div>
                </div>
              </div>
              
              <button
                onClick={() => setPlayerCount((count) => Math.min(count + 1, 5))}
                disabled={playerCount >= 5}
                className="group relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-r-xl font-bold text-xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-r-xl"></div>
                <span className="relative">+</span>
              </button>
            </div>
            <p className="text-center text-white/50 text-sm mt-3">
              Choose 2-5 players for local multiplayer
            </p>
          </div>

          {/* Start Game Button */}
          <button
            onClick={startGame}
            disabled={isStarting}
            className="group relative w-full bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {/* Button glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            
            {/* Button content */}
            <div className="relative flex items-center justify-center">
              {isStarting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Starting Game...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start Game
                </>
              )}
            </div>
          </button>
        </div>

        {/* Game Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border border-white/5">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-white/70 text-sm">Local Multiplayer</p>
          </div>
          
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border border-white/5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-white/70 text-sm">Fast-Paced</p>
          </div>
          
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border border-white/5">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-white/70 text-sm">Strategy Game</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;