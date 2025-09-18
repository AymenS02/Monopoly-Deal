import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Player, GameState } from "../game/store/gameStore";
import type { Card } from "../game/utils/deck";
import { socket } from "../game/socket";
import { useGameStore } from "../game/store/gameStoreZustand";

// Function to get or create persistent player ID
function getPersistentPlayerId() {
  let persistentId = sessionStorage.getItem('playerPersistentId');
  if (!persistentId) {
    persistentId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('playerPersistentId', persistentId);
  }
  return persistentId;
}

function Home() {
  const navigate = useNavigate();
  const setGameState = useGameStore((state) => state.setGameState);
  const setMyHand = useGameStore((state) => state.setMyHand);
  const setPlayerId = useGameStore((state) => state.setPlayerId);

  const [room, setRoom] = useState("");
  const [playerName, setPlayerName] = useState(""); 
  const [playerCount, setPlayerCount] = useState(0);
  const [isStarting, setIsStarting] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [reconnectionStatus, setReconnectionStatus] = useState<string>("");

  useEffect(() => {
    // Check if we're returning from a refresh and should auto-navigate
    const storedRoom = localStorage.getItem("monopoly_room");
    const storedPlayerName = localStorage.getItem("monopoly_player_name");
    const hasActiveGame = localStorage.getItem("monopoly_game_active");
    
    if (storedRoom && storedPlayerName && hasActiveGame === "true") {
      // Auto-navigate back to game
      navigate("/game");
      return;
    }

    socket.on("player_count_update", (count: number) => setPlayerCount(count));
    socket.on("room_full", () => alert("Room is full! Try another room."));
    socket.on("set_host", () => {
      alert("You are now the host!");
      setIsHost(true);
    });

    // Listen for persistent ID assignment (for new players)
    socket.on('persistent_id_assigned', (data: { persistentId: string }) => {
      sessionStorage.setItem('playerPersistentId', data.persistentId);
      console.log('Persistent ID assigned:', data.persistentId);
      setReconnectionStatus("New player registered!");
      setTimeout(() => setReconnectionStatus(""), 3000);
    });

    // Listen for reconnection confirmation
    socket.on('reconnection_confirmed', (data: { persistentId: string }) => {
      console.log('Successfully reconnected with persistent ID:', data.persistentId);
      setReconnectionStatus("Reconnected successfully!");
      setTimeout(() => setReconnectionStatus(""), 3000);
    });

    socket.on("game_started", (data: {
      hand: Card[],
      players: { id: string, name: string, handCount: number, bank: Card[], properties: Card[] }[],
      deckCount: number,
      discardPile: Card[]
    }) => {
      const players: Player[] = data.players.map(p => ({
        id: p.id,
        name: p.id === socket.id ? playerName : p.name,
        hand: p.id === socket.id ? data.hand : Array(p.handCount).fill({} as Card),
        bank: p.bank,
        properties: p.properties
      }));

      const initialGameState: GameState = {
        players,
        deck: Array(data.deckCount).fill({} as Card),
        discardPile: data.discardPile,
        currentPlayer: 0
      };

      // Store game info for refresh recovery
      localStorage.setItem("monopoly_room", room);
      localStorage.setItem("monopoly_player_name", playerName);
      localStorage.setItem("monopoly_game_active", "true");

      setGameState(initialGameState);
      setMyHand(data.hand);
      setPlayerId(socket.id || "");
      
      navigate("/game");
    });

    // Auto-request game state when socket connects
    socket.on('connect', () => {
      console.log('Socket connected, requesting game state...');
      socket.emit('request_game_state');
    });

    return () => {
      socket.off("player_count_update");
      socket.off("room_full");
      socket.off("set_host");
      socket.off("game_started");
      socket.off('persistent_id_assigned');
      socket.off('reconnection_confirmed');
      socket.off('connect');
    };
  }, [playerName, setGameState, setMyHand, setPlayerId, navigate, room]);

  const joinRoom = () => {
    if (room.trim() === "" || playerName.trim() === "") {
      alert("Please enter a room and your player name.");
      return;
    }
    
    // Get the persistent ID and include it in the join request
    const persistentId = getPersistentPlayerId();
    console.log('Joining room with persistent ID:', persistentId);
    
    socket.emit("join_room", { 
      room: room.trim(), 
      name: playerName.trim(),
      persistentId: persistentId
    });
    
    setIsHost(false);
    setReconnectionStatus("Joining room...");
    setTimeout(() => setReconnectionStatus(""), 2000);
  };

  const startGame = () => {
    if (!isHost) {
      alert("Only the host can start the game!");
      return;
    }
    socket.emit("start_game", room);
    setIsStarting(true);
  };

  const clearAllData = () => {
    // Clear both localStorage and sessionStorage
    localStorage.removeItem("monopoly_room");
    localStorage.removeItem("monopoly_player_name");
    localStorage.removeItem("monopoly_game_active");
    sessionStorage.removeItem("playerPersistentId");
    alert("All game data cleared!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Monopoly Deal</h1>

      {/* Show reconnection status */}
      {reconnectionStatus && (
        <div className="mb-4 px-4 py-2 bg-blue-600 rounded text-white text-sm">
          {reconnectionStatus}
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="px-4 py-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="Enter room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="px-4 py-2 rounded text-black"
        />
        <button
          onClick={joinRoom}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          Join Room
        </button>
      </div>

      <p className="mb-2">Current Room: {room || "None"}</p>
      <p className="mb-4">Players in room: {playerCount} / 5</p>

      <button
        onClick={startGame}
        disabled={playerCount < 2 || isStarting || !isHost}
        className="px-6 py-3 bg-blue-600 rounded disabled:opacity-50 hover:bg-blue-700"
      >
        {isStarting ? "Starting..." : "Start Game"}
      </button>
      
      {/* Debug info */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        <div>Socket ID: {socket.id}</div>
        <div>Persistent ID: {sessionStorage.getItem('playerPersistentId')}</div>
      </div>
      
      {/* Clear game data button for testing */}
      <button
        onClick={clearAllData}
        className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm"
      >
        Clear All Game Data
      </button>
    </div>
  );
}

export default Home;