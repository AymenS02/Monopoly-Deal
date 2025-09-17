import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../game/store/context";
import { cards } from "../game/data/cards";
import { createDeckFromTemplates, shuffleDeck, type Card } from "../game/utils/deck";
import type { Player, GameState } from "../game/store/gameStore";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function Home() {
  const navigate = useNavigate();
  const { setGameState } = useContext(StoreContext)!;

  const [room, setRoom] = useState("");
  const [playerCount, setPlayerCount] = useState(1); // current players in room
  const [isStarting, setIsStarting] = useState(false);

  // Listen for player count updates from server
  useEffect(() => {
    socket.on("player_count_update", (count) => {
      setPlayerCount(count);
    });

    socket.on("room_full", () => {
      alert("Room is full! Try another room.");
    });

    return () => {
      socket.off("player_count_update");
      socket.off("room_full");
    };
  }, []);

  const joinRoom = () => {
    if (room.trim() !== "") {
      socket.emit("join_room", room.trim());
    }
  };

  const startGame = () => {
    if (!setGameState) return;
    if (playerCount < 2) {
      alert("Need at least 2 players to start!");
      return;
    }

    setIsStarting(true);

    // 1. Create full deck
    let deck: Card[] = createDeckFromTemplates(cards);
    deck = shuffleDeck(deck);

    // 2. Create placeholder players based on playerCount
    const players: Player[] = [];
    for (let i = 0; i < playerCount; i++) {
      const hand = deck.splice(0, 5);
      players.push({ id: i, name: `Player ${i + 1}`, hand, bank: [], properties: [] });
    }

    const initialGameState: GameState = {
      players,
      deck,
      discardPile: [],
      currentPlayer: 0,
    };

    setGameState(initialGameState);
    navigate("/game");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Monopoly Deal</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="px-4 py-2 rounded text-black"
        />
        <button
          onClick={joinRoom}
          className="ml-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          Join Room
        </button>
      </div>
      
      <p className="mb-2">Current Room: {room || "None"}</p>

      <p className="mb-4">Players in room: {playerCount} / 5</p>

      <button
        onClick={startGame}
        disabled={playerCount < 2 || isStarting}
        className="px-6 py-3 bg-blue-600 rounded disabled:opacity-50 hover:bg-blue-700"
      >
        {isStarting ? "Starting..." : "Start Game"}
      </button>
    </div>
  );
}

export default Home;
