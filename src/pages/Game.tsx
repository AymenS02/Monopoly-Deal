import { useEffect } from "react";
import Board from "../components/Board";
import Hand from "../components/Hand";
import { socket } from "../game/socket";
import { useGameStore } from "../game/store/gameStoreZustand";

const Game = () => {
  // Zustand store
  const setGameState = useGameStore((state) => state.setGameState);
  const setMyHand = useGameStore((state) => state.setMyHand);
  const gameState = useGameStore((state) => state.gameState);
  const myHand = useGameStore((state) => state.myHand);
  const playerId = useGameStore((state) => state.playerId);

  useEffect(() => {
    // Request current game state from server on mount
    socket.emit("request_game_state");

    socket.on("game_state", (data) => {
      setMyHand(data.hand);
      setGameState(data.gameState);
    });
    console.log("Game state updated:", gameState);
    return () => {
      socket.off("game_state");
    };
  }, [setGameState, setMyHand]);

  // Find your player object in the game state
  const me = gameState.players.find((p) => p.id === playerId);

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center bg-gradient-to-br from-green-800 to-green-900 p-6">
      
      {/* Board */}
      <div className="flex-1 w-full flex justify-center overflow-auto">
        <Board />
      </div>

      {/* Your Hand */}
      {me && (
        <div className="w-full max-w-7xl mt-4">
          <h2 className="text-white text-xl font-bold mb-2 text-center">
            {me.name}'s Hand
          </h2>
          <Hand 
            playerName={me.name} 
            hand={myHand}  // only your hand
            isMe={true}    // ensures cards are visible
          />
        </div>
      )}
    </div>
  );
};

export default Game;
