import { useContext } from "react";
import Board from "../components/Board";
import Hand from "../components/Hand";
import { StoreContext } from "../game/store/context";
import { socket } from "../game/socket"; // make sure you export socket from your socket file

const Game = () => {
  const { gameState } = useContext(StoreContext)!;

  // Determine current player
  const currentPlayer = gameState?.players[gameState.currentPlayer];

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center bg-gradient-to-br from-green-800 to-green-900 p-6">
      
      {/* Board */}
      <div className="flex-1 w-full flex justify-center overflow-auto">
        <Board />
      </div>

      {/* Current Player Hand */}
      {currentPlayer && (
        <div className="w-full max-w-7xl mt-4">
          <h2 className="text-white text-xl font-bold mb-2 text-center">
            {currentPlayer.name}'s Hand
          </h2>
          <Hand 
            playerName={currentPlayer.name} 
            hand={currentPlayer.hand} 
            isMe={currentPlayer.id === socket.id} 
          />
        </div>
      )}
    </div>
  );
};

export default Game;
