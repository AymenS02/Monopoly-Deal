import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../game/store/context";
import type { Player, GameState } from "../game/store/gameStore";
import type { Card } from "../game/utils/deck";
import { socket } from "../game/socket"; // make sure you export socket from your socket file

function Home() {
  const navigate = useNavigate();
  const { setGameState } = useContext(StoreContext)!;

  const [room, setRoom] = useState("");
  const [playerName, setPlayerName] = useState(""); // NEW: player name input
  const [playerCount, setPlayerCount] = useState(0);
  const [isStarting, setIsStarting] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.on("player_count_update", (count: number) => setPlayerCount(count));
    socket.on("room_full", () => alert("Room is full! Try another room."));
    socket.on("set_host", () => {
      alert("You are now the host!");
      setIsHost(true);
    });

    socket.on("game_started", (data: {
      hand: Card[],
      players: { id: string, name: string, handCount: number, bank: Card[], properties: Card[] }[],
      deckCount: number,
      discardPile: Card[]
    }) => {
      if (!setGameState) return;

      const players: Player[] = data.players.map(p => ({
        id: p.id,
        name: p.id === socket.id ? playerName : p.name, // use the entered name
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

      setGameState(initialGameState);
      navigate("/game");
    });

    return () => {
      socket.off("player_count_update");
      socket.off("room_full");
      socket.off("set_host");
      socket.off("game_started");
    };
  }, [playerName, setGameState, navigate]);

  const joinRoom = () => {
    if (room.trim() === "" || playerName.trim() === "") {
      alert("Please enter a room and your player name.");
      return;
    }
    socket.emit("join_room", { room: room.trim(), name: playerName.trim() });
    setIsHost(false);
  };

  const startGame = () => {
    if (!isHost) {
      alert("Only the host can start the game!");
      return;
    }
    socket.emit("start_game", room);
    setIsStarting(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Monopoly Deal</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="px-4 py-2 rounded text-white"
        />
        <input
          type="text"
          placeholder="Enter room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="px-4 py-2 rounded text-white"
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
    </div>
  );
}

export default Home;
