import { io } from "socket.io-client";

// Get or create persistent playerId
let playerId = localStorage.getItem("monopoly_player_id");
if (!playerId) {
  playerId = crypto.randomUUID(); // or use uuid library
  localStorage.setItem("monopoly_player_id", playerId);
}

// Create socket with persistent playerId
export const socket = io("http://localhost:3001", {
  query: { playerId },
  autoConnect: true,
});
