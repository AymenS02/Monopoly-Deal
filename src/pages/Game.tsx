import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import Hand from "../components/Hand";
import { socket } from "../game/socket";
import { useGameStore } from "../game/store/gameStoreZustand";

// Function to get persistent player ID
function getPersistentPlayerId() {
  return sessionStorage.getItem('playerPersistentId');
}

const Game = () => {
  const navigate = useNavigate();
  const gameState = useGameStore((state) => state.gameState);
  const myHand = useGameStore((state) => state.myHand);
  const playerId = useGameStore((state) => state.playerId);
  const setGameState = useGameStore((state) => state.setGameState);
  const setMyHand = useGameStore((state) => state.setMyHand);
  const setPlayerId = useGameStore((state) => state.setPlayerId);
  const clearGameState = useGameStore((state) => state.clearGameState);

  // Find your player object - now also check by persistentId
  const me = gameState.players.find((p) => 
    p.id === playerId || 
    p.id === socket.id || 
    (p as any).persistentId === getPersistentPlayerId()
  );
  
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    
    const rejoinAndRequestState = () => {
      if (!socket.id) return;
      
      // Check if we have stored room/player info
      const storedRoom = localStorage.getItem("monopoly_room");
      const storedPlayerName = localStorage.getItem("monopoly_player_name");
      const persistentId = getPersistentPlayerId();
      
      if (storedRoom && storedPlayerName) {
        console.log("🔄 Auto-rejoining room:", storedRoom, "as", storedPlayerName, "with persistent ID:", persistentId);
        
        // Rejoin the room first with persistent ID
        socket.emit("join_room", { 
          room: storedRoom, 
          name: storedPlayerName,
          persistentId: persistentId
        });
        
        // Then request game state with retry logic
        const requestWithRetry = () => {
          if (retryCount < maxRetries) {
            console.log(`✅ Requesting game state for socket ${socket.id} (attempt ${retryCount + 1})`);
            socket.emit("request_game_state");
            retryCount++;
            
            // If we don't get a response, try again
            setTimeout(() => {
              if (myHand.length === 0 && retryCount < maxRetries) {
                console.log("⚠️ No hand data received, retrying...");
                requestWithRetry();
              }
            }, 1000);
          } else {
            console.log("❌ Max retries reached, giving up");
          }
        };
        
        setTimeout(requestWithRetry, 200);
      }
    };

    // If already connected, rejoin immediately
    if (socket.connected) {
      rejoinAndRequestState();
    }

    // Listen for connect event in case socket wasn't ready
    socket.on("connect", rejoinAndRequestState);

    // Listen for reconnection confirmation
    socket.on('reconnection_confirmed', (data: { persistentId: string }) => {
      console.log('🎉 Reconnected successfully with persistent ID:', data.persistentId);
      // Request game state after successful reconnection
      setTimeout(() => {
        console.log("🔄 Requesting game state after reconnection confirmation");
        socket.emit("request_game_state");
      }, 100);
    });

    // Handle successful rejoin
    socket.on("player_count_update", (count: number) => {
      console.log("👥 Player count updated:", count);
      // After successful rejoin, request game state again to be sure
      const storedRoom = localStorage.getItem("monopoly_room");
      if (storedRoom && count > 0 && myHand.length === 0) {
        setTimeout(() => {
          console.log("🔄 Requesting game state after player count update");
          socket.emit("request_game_state");
        }, 100);
      }
    });

    // Handle incoming game state
    const handleGameState = (data: any) => {
      console.log("📦 Received game state:", data);
      retryCount = maxRetries; // Stop retrying once we get data
      
      if (data.hand && Array.isArray(data.hand)) {
        console.log("🃏 Setting hand:", data.hand.length, "cards");
        setMyHand(data.hand);
      }
      
      if (data.gameState) {
        console.log("🎮 Setting game state with", data.gameState.players.length, "players");
        setGameState(data.gameState);
      }
      
      // Update playerId if it changed
      if (socket.id) {
        console.log("👤 Setting player ID:", socket.id);
        setPlayerId(socket.id);
      }
      
      // Store the persistent ID if it was sent
      if (data.persistentId) {
        sessionStorage.setItem('playerPersistentId', data.persistentId);
        console.log("💾 Stored persistent ID:", data.persistentId);
      }
    };
    socket.on("game_state", handleGameState);

    // Cleanup
    return () => {
      socket.off("connect", rejoinAndRequestState);
      socket.off("reconnection_confirmed");
      socket.off("player_count_update");
      socket.off("game_state", handleGameState);
    };
  }, [setGameState, setMyHand, setPlayerId, myHand.length]);

  
  // Use hand from either myHand store or from the player object as fallback
  const currentHand = myHand.length > 0 ? myHand : (me?.hand || []);

  const leaveGame = () => {
    // Clear localStorage but keep sessionStorage for potential reconnection
    localStorage.removeItem("monopoly_room");
    localStorage.removeItem("monopoly_player_name");
    localStorage.removeItem("monopoly_game_active");
    // Note: We're keeping the persistentId in sessionStorage for future reconnections
    
    // Clear Zustand state
    if (clearGameState) {
      clearGameState();
    }
    
    // Disconnect from current room
    socket.disconnect();
    
    // Reconnect for future use
    setTimeout(() => {
      socket.connect();
    }, 100);
    
    // Navigate back to home
    navigate("/");
  };

  const forceLeaveAndClearAll = () => {
    // Clear everything including persistent ID
    localStorage.removeItem("monopoly_room");
    localStorage.removeItem("monopoly_player_name");
    localStorage.removeItem("monopoly_game_active");
    sessionStorage.removeItem("playerPersistentId");
    
    // Clear Zustand state
    if (clearGameState) {
      clearGameState();
    }
    
    // Disconnect from current room
    socket.disconnect();
    
    // Reconnect for future use
    setTimeout(() => {
      socket.connect();
    }, 100);
    
    // Navigate back to home
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center bg-gradient-to-br from-green-800 to-green-900 p-6">
      {/* Top bar with leave buttons */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-4">
        <div className="text-white text-xl font-bold">Monopoly Deal</div>
        <div className="flex gap-2">
          <button
            onClick={leaveGame}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Leave Game
          </button>
          <button
            onClick={forceLeaveAndClearAll}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
          >
            Leave & Clear All
          </button>
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center overflow-auto">
        <Board />
      </div>

      {me && (
        <div className="w-full max-w-7xl mt-4">
          <h2 className="text-white text-xl font-bold mb-2 text-center">
            {me.name}'s Hand
          </h2>
          <Hand
            playerName={me.name}
            hand={currentHand}
            isMe={true} // ensures cards are visible
          />
        </div>
      )}
      
      {/* Debug info */}
      <div className="text-white text-xs mt-2 text-center">
        <div>Socket ID: {socket.id}</div>
        <div>Player ID: {playerId}</div>
        <div>Persistent ID: {getPersistentPlayerId()}</div>
        <div>Hand Count: {currentHand.length}</div>
        <div>Game State Players: {gameState.players.length}</div>
      </div>
    </div>
  );
};

export default Game;