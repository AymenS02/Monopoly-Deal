import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { socket } from "./game/socket";
import { useGameStore } from "./game/store/gameStoreZustand";

function App() {
  const setPlayerId = useGameStore((state) => state.setPlayerId);
  const setGameState = useGameStore((state) => state.setGameState);
  const setMyHand = useGameStore((state) => state.setMyHand);

  useEffect(() => {
    socket.on("connect", () => {
      if (socket.id) {            // ✅ only set if socket.id exists
        setPlayerId(socket.id);
        console.log("Connected with ID:", socket.id);
      }
    });

    socket.on("game_started", (data) => {
      setMyHand(data.hand);
      setGameState({
        players: data.players,
        deck: new Array(data.deckCount).fill(null),
        discardPile: data.discardPile,
        currentPlayer: 0, // update server to send actual currentPlayer
      });
    });

    return () => {
      socket.off("connect");
      socket.off("game_started");
    };
  }, [setPlayerId, setGameState, setMyHand]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
