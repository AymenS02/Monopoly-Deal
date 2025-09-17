import React, { useState } from "react";
import App from "./App";
import { StoreContext, type StoreContextType } from "./game/store/context";
import type { GameState } from "./game/store/gameStore";

const Root: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    deck: [],
    discardPile: [],
    currentPlayer: 0,
  });

  const contextValue: StoreContextType = { gameState, setGameState };

  return (
    <StoreContext.Provider value={contextValue}>
      <App />
    </StoreContext.Provider>
  );
};

export default Root;
