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
  const [playerCount, setPlayerCount] = useState(0);
  const [isStarting, setIsStarting] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // Player count updates
    socket.on("player_count_update", (count: number) => {
      setPlayerCount(count);
    });

    // Room full
    socket.on("room_full", () => {
      alert("Room is full! Try another room.");
    });

    // Host assignment
    socket.on("set_host", () => {
      alert("You are now the host!");
      setIsHost(true);
    });

    // Game started: server sends your hand and room state
    socket.on("game_started", (data: {
      hand: Card[],
      players: { id: string, name: string, handCount: number, bank: Card[], properties: Card[] }[],
      deckCount: number,
      discardPile: Card[]
    }) => {
      if (!setGameState) return;

      // Map players into proper Player objects
      const players: Player[] = data.players.map(p => ({
        id: p.id,
        name: p.name === socket.id ? "You" : p.name,
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
  }, []);

  const joinRoom = () => {
    if (room.trim() !== "") {
      socket.emit("join_room", room.trim());
      setIsHost(false);
    }
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
        disabled={playerCount < 2 || isStarting || !isHost}
        className="px-6 py-3 bg-blue-600 rounded disabled:opacity-50 hover:bg-blue-700"
      >
        {isStarting ? "Starting..." : "Start Game"}
      </button>
    </div>
  );
}

export default Home;
