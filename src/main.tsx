import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { StoreContext, type StoreContextType } from './game/store/context.ts';
import type { GameState } from './game/store/gameStore.ts';

const Root = () => {
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
