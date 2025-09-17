// src/game/store/context.ts


import { createContext } from "react";
import type { GameState } from "./gameStore";

export type StoreContextType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
};

// Initialize with undefined to enforce provider usage
export const StoreContext = createContext<StoreContextType | undefined>(undefined);
